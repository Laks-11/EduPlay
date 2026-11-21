/** Shared helpers for reading a user's progress in the shape the frontend expects. */

const LANGUAGES = ['en', 'od', 'hi'];

function levelFromXp(xp, xpPerLevel) {
  return Math.floor(xp / xpPerLevel) + 1;
}

function getProgress(db, userId, gameConfig) {
  const row = db.prepare('SELECT xp, coins FROM progress WHERE user_id = ?').get(userId) || { xp: 0, coins: 0 };
  const subjectProgress = {};
  for (const s of db.prepare('SELECT id FROM subjects').all()) subjectProgress[s.id] = 0;
  for (const r of db.prepare('SELECT subject_id, best_percent FROM subject_progress WHERE user_id = ?').all(userId)) {
    subjectProgress[r.subject_id] = r.best_percent;
  }
  return {
    level: levelFromXp(row.xp, gameConfig.xpPerLevel),
    xp: row.xp,
    coins: row.coins,
    subjectProgress,
  };
}

module.exports = { LANGUAGES, levelFromXp, getProgress };
