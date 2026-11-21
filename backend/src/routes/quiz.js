const express = require('express');
const rateLimit = require('express-rate-limit');
const { requireAuth } = require('../middleware/auth');
const { HttpError } = require('../middleware/errors');
const { getProgress, levelFromXp } = require('../progress');

const MAX_ANSWERS = 20;

module.exports = function quizRoutes(db, gameConfig) {
  const router = express.Router();

  const toQuestion = (r) => ({
    id: r.id,
    question: JSON.parse(r.question),
    options: JSON.parse(r.options),
    correct: r.correct,
    explanation: JSON.parse(r.explanation),
  });

  // Limits XP farming: each logged-in user may submit at most 20 quizzes per 5 minutes.
  const submitLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: (req) => `user-${req.userId}`,
    message: { error: 'Slow down! Please wait a few minutes before submitting more quizzes.' },
  });

  /**
   * GET /api/quiz/:subjectId?count=5
   * Random questions for a subject. Includes `correct` + `explanation` because the app shows
   * instant feedback (and must keep working offline). XP is still graded server-side on submit.
   */
  router.get('/:subjectId', (req, res) => {
    const { subjectId } = req.params;
    if (!db.prepare('SELECT 1 FROM subjects WHERE id = ?').get(subjectId)) {
      throw new HttpError(404, 'Unknown subject.');
    }
    const requested = parseInt(req.query.count, 10);
    const count = Math.min(Math.max(Number.isNaN(requested) ? gameConfig.questionsPerQuiz : requested, 1), MAX_ANSWERS);
    const rows = db.prepare('SELECT * FROM questions WHERE subject_id = ? ORDER BY RANDOM() LIMIT ?').all(subjectId, count);
    res.json({ subjectId, questions: rows.map(toQuestion) });
  });

  /**
   * POST /api/quiz/submit  (auth)
   * Body: { subjectId, clientSubmissionId?, answers: [{ questionId, selected: 0-3 | null }] }
   * The server re-grades from its own answer key - the client cannot send its own score/XP.
   * clientSubmissionId makes retries (e.g. after being offline) safe: the same id is never paid out twice.
   */
  router.post('/submit', requireAuth(db), submitLimiter, (req, res) => {
    const { subjectId, answers, clientSubmissionId } = req.body || {};

    if (typeof subjectId !== 'string' || !db.prepare('SELECT 1 FROM subjects WHERE id = ?').get(subjectId)) {
      throw new HttpError(400, 'Unknown subject.');
    }
    if (!Array.isArray(answers) || answers.length < 1 || answers.length > MAX_ANSWERS) {
      throw new HttpError(400, `Send between 1 and ${MAX_ANSWERS} answers.`);
    }
    if (clientSubmissionId != null && (typeof clientSubmissionId !== 'string' || clientSubmissionId.length > 64)) {
      throw new HttpError(400, 'Invalid clientSubmissionId.');
    }

    const seen = new Set();
    for (const a of answers) {
      const okSelected = a && (a.selected === null || (Number.isInteger(a.selected) && a.selected >= 0 && a.selected <= 9));
      if (!a || typeof a.questionId !== 'string' || !okSelected) {
        throw new HttpError(400, 'Each answer needs a questionId and a selected option (or null).');
      }
      if (seen.has(a.questionId)) throw new HttpError(400, 'Duplicate question in answers.');
      seen.add(a.questionId);
    }

    // Idempotent retry: return the stored result without paying out again.
    if (clientSubmissionId) {
      const prev = db
        .prepare('SELECT * FROM quiz_attempts WHERE user_id = ? AND client_submission_id = ?')
        .get(req.userId, clientSubmissionId);
      if (prev) {
        return res.json({
          duplicate: true,
          result: {
            correct: prev.correct, total: prev.total, percent: prev.percent,
            xpEarned: prev.xp_earned, coinsEarned: prev.coins_earned, leveledUp: false,
          },
          progress: getProgress(db, req.userId, gameConfig),
        });
      }
    }

    const ids = [...seen];
    const keyRows = db
      .prepare(`SELECT id, correct FROM questions WHERE subject_id = ? AND id IN (${ids.map(() => '?').join(',')})`)
      .all(subjectId, ...ids);
    if (keyRows.length !== ids.length) {
      throw new HttpError(400, 'One or more questions do not belong to this subject.');
    }
    const key = new Map(keyRows.map((r) => [r.id, r.correct]));

    const total = answers.length;
    const correct = answers.filter((a) => a.selected === key.get(a.questionId)).length;
    const percent = Math.round((correct / total) * 100);
    const xpEarned = correct * gameConfig.xpPerQuestion;
    const coinsEarned = correct * gameConfig.coinsPerQuestion;

    const { progress, leveledUp } = db.transaction(() => {
      const before = db.prepare('SELECT xp FROM progress WHERE user_id = ?').get(req.userId).xp;
      db.prepare('UPDATE progress SET xp = xp + ?, coins = coins + ? WHERE user_id = ?').run(xpEarned, coinsEarned, req.userId);
      db.prepare(`
        INSERT INTO subject_progress (user_id, subject_id, best_percent) VALUES (?, ?, ?)
        ON CONFLICT(user_id, subject_id) DO UPDATE SET best_percent = MAX(best_percent, excluded.best_percent)`)
        .run(req.userId, subjectId, percent);
      db.prepare(`
        INSERT INTO quiz_attempts (user_id, subject_id, correct, total, percent, xp_earned, coins_earned, client_submission_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(req.userId, subjectId, correct, total, percent, xpEarned, coinsEarned, clientSubmissionId || null);
      const progress = getProgress(db, req.userId, gameConfig);
      return { progress, leveledUp: progress.level > levelFromXp(before, gameConfig.xpPerLevel) };
    })();

    res.json({ duplicate: false, result: { correct, total, percent, xpEarned, coinsEarned, leveledUp }, progress });
  });

  return router;
};
