const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  language      TEXT NOT NULL DEFAULT 'en',
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS progress (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  xp      INTEGER NOT NULL DEFAULT 0,
  coins   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS subject_progress (
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id   TEXT NOT NULL,
  best_percent INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, subject_id)
);

CREATE TABLE IF NOT EXISTS subjects (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL,   -- JSON: {"en": "...", "od": "...", "hi": "..."}
  icon TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id          TEXT PRIMARY KEY,
  subject_id  TEXT NOT NULL REFERENCES subjects(id),
  question    TEXT NOT NULL,  -- JSON per language
  options     TEXT NOT NULL,  -- JSON array
  correct     INTEGER NOT NULL,
  explanation TEXT NOT NULL   -- JSON per language
);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject_id);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id              INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id           TEXT NOT NULL,
  correct              INTEGER NOT NULL,
  total                INTEGER NOT NULL,
  percent              INTEGER NOT NULL,
  xp_earned            INTEGER NOT NULL,
  coins_earned         INTEGER NOT NULL,
  client_submission_id TEXT,
  created_at           TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id, client_submission_id)
);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON quiz_attempts(user_id, created_at);
`;

function readJson(dir, file) {
  return JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
}

/** Upsert subjects + questions from backend/data/*.json (safe to run on every boot). */
function seedContent(db, dataDir) {
  const subjects = readJson(dataDir, 'subjects.json');
  const questions = readJson(dataDir, 'questions.json');

  const upsertSubject = db.prepare(`
    INSERT INTO subjects (id, name, icon) VALUES (@id, @name, @icon)
    ON CONFLICT(id) DO UPDATE SET name = excluded.name, icon = excluded.icon`);
  const upsertQuestion = db.prepare(`
    INSERT INTO questions (id, subject_id, question, options, correct, explanation)
    VALUES (@id, @subjectId, @question, @options, @correct, @explanation)
    ON CONFLICT(id) DO UPDATE SET
      subject_id = excluded.subject_id, question = excluded.question,
      options = excluded.options, correct = excluded.correct,
      explanation = excluded.explanation`);

  db.transaction(() => {
    for (const s of subjects) {
      upsertSubject.run({ id: s.id, name: JSON.stringify(s.name), icon: s.icon });
    }
    for (const q of questions) {
      upsertQuestion.run({
        id: q.id,
        subjectId: q.subjectId,
        question: JSON.stringify(q.question),
        options: JSON.stringify(q.options),
        correct: q.correct,
        explanation: JSON.stringify(q.explanation),
      });
    }
  })();
}

function createDb(dbPath, dataDir) {
  if (dbPath !== ':memory:') {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(SCHEMA);
  seedContent(db, dataDir);
  return db;
}

module.exports = { createDb };
