const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { getProgress } = require('../progress');

module.exports = function progressRoutes(db, gameConfig) {
  const router = express.Router();

  router.get('/', requireAuth(db), (req, res) => {
    res.json(getProgress(db, req.userId, gameConfig));
  });

  router.get('/history', requireAuth(db), (req, res) => {
    const rows = db
      .prepare(`SELECT subject_id AS subjectId, correct, total, percent, xp_earned AS xpEarned,
                       coins_earned AS coinsEarned, created_at AS createdAt
                FROM quiz_attempts WHERE user_id = ? ORDER BY id DESC LIMIT 50`)
      .all(req.userId);
    res.json(rows);
  });

  return router;
};
