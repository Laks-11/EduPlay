const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const quizRoutes = require('./routes/quiz');
const progressRoutes = require('./routes/progress');
const { notFound, errorHandler } = require('./middleware/errors');

function createApp({ db, config }) {
  const gameConfig = JSON.parse(fs.readFileSync(path.join(config.dataDir, 'game-config.json'), 'utf8'));
  const app = express();

  app.disable('x-powered-by');
  // Behind a hosting proxy the real client IP is in X-Forwarded-For.
// Without this, rate limits would count ALL users as one IP.
if (config.isProd) app.set('trust proxy', 1);
  // The frontend uses inline <script>/styles and base64 audio in index.html, so the default
  // CSP would block it. Everything else in helmet's defaults stays on.
  app.use(helmet({ contentSecurityPolicy: false }));

  if (config.corsOrigins.length) {
    app.use('/api', cors({ origin: config.corsOrigins }));
  }
  app.use(express.json({ limit: '50kb' }));

  app.get('/api/health', (req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRoutes(db, gameConfig));
  app.use('/api/progress', progressRoutes(db, gameConfig));
  app.use('/api/quiz', quizRoutes(db, gameConfig));
  app.use('/api', contentRoutes(db, config.dataDir, gameConfig));
  app.use('/api', notFound);

  // Serve the frontend from the same server so `npm start` runs the whole app.
  app.use(express.static(config.frontendDir));

  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
