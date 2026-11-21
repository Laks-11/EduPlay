const express = require('express');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const { signToken, requireAuth } = require('../middleware/auth');
const { HttpError } = require('../middleware/errors');
const { LANGUAGES, getProgress } = require('../progress');

const USERNAME_RE = /^[A-Za-z0-9_]{3,20}$/;

module.exports = function authRoutes(db, gameConfig) {
  const router = express.Router();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many attempts. Please wait a few minutes and try again.' },
  });

  const publicUser = (u) => ({ id: u.id, username: u.username, language: u.language });

  router.post('/register', limiter, (req, res) => {
    const { username, password, language } = req.body || {};
    if (typeof username !== 'string' || !USERNAME_RE.test(username)) {
      throw new HttpError(400, 'Username must be 3-20 letters, numbers or underscores.');
    }
    if (typeof password !== 'string' || password.length < 4 || password.length > 72) {
      throw new HttpError(400, 'Password must be 4-72 characters.');
    }
    const lang = LANGUAGES.includes(language) ? language : 'en';

    if (db.prepare('SELECT 1 FROM users WHERE username = ?').get(username)) {
      throw new HttpError(409, 'That username is already taken.');
    }

    const hash = bcrypt.hashSync(password, 10);
    const userId = db.transaction(() => {
      const { lastInsertRowid } = db
        .prepare('INSERT INTO users (username, password_hash, language) VALUES (?, ?, ?)')
        .run(username, hash, lang);
      db.prepare('INSERT INTO progress (user_id) VALUES (?)').run(lastInsertRowid);
      return Number(lastInsertRowid);
    })();

    const user = { id: userId, username, language: lang };
    res.status(201).json({ token: signToken(user), user, progress: getProgress(db, userId, gameConfig) });
  });

  router.post('/login', limiter, (req, res) => {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new HttpError(400, 'Username and password are required.');
    }
    const row = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    // Same message for unknown user / wrong password so usernames can't be probed.
    if (!row || !bcrypt.compareSync(password, row.password_hash)) {
      throw new HttpError(401, 'Wrong username or password.');
    }
    res.json({ token: signToken(row), user: publicUser(row), progress: getProgress(db, row.id, gameConfig) });
  });

  router.get('/me', requireAuth(db), (req, res) => {
    const row = db.prepare('SELECT id, username, language FROM users WHERE id = ?').get(req.userId);
    res.json({ user: publicUser(row), progress: getProgress(db, row.id, gameConfig) });
  });

  router.patch('/me', requireAuth(db), (req, res) => {
    const { language } = req.body || {};
    if (!LANGUAGES.includes(language)) throw new HttpError(400, 'Unsupported language.');
    db.prepare('UPDATE users SET language = ? WHERE id = ?').run(language, req.userId);
    res.json({ ok: true, language });
  });

  return router;
};
