const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports = function contentRoutes(db, dataDir, gameConfig) {
  const router = express.Router();
  const translations = JSON.parse(fs.readFileSync(path.join(dataDir, 'translations.json'), 'utf8'));

  router.get('/config', (req, res) => res.json(gameConfig));
  router.get('/translations', (req, res) => res.json(translations));

  router.get('/subjects', (req, res) => {
    const rows = db.prepare('SELECT id, name, icon FROM subjects ORDER BY rowid').all();
    res.json(rows.map((r) => ({ id: r.id, name: JSON.parse(r.name), icon: r.icon })));
  });

  return router;
};
