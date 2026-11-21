const jwt = require('jsonwebtoken');
const config = require('../config');

function signToken(user) {
  return jwt.sign({ sub: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

/** Requires a valid "Authorization: Bearer <token>" header; sets req.userId. */
function requireAuth(db) {
  const findUser = db.prepare('SELECT id FROM users WHERE id = ?');
  return (req, res, next) => {
    const header = req.get('authorization') || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Please sign in.' });
    }
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      if (!findUser.get(payload.sub)) {
        return res.status(401).json({ error: 'Account no longer exists.' });
      }
      req.userId = payload.sub;
      next();
    } catch {
      return res.status(401).json({ error: 'Session expired. Please sign in again.' });
    }
  };
}

module.exports = { signToken, requireAuth };
