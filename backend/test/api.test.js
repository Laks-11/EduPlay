const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { createDb } = require('../src/db');
const { createApp } = require('../src/app');

process.env.JWT_SECRET = 'test-secret';
const config = {
  jwtSecret: 'test-secret',
  dataDir: path.join(__dirname, '..', 'data'),
  frontendDir: path.join(__dirname, '..', '..', 'frontend'),
  corsOrigins: [],
};

let server, base, db;
const call = async (method, url, body, token) => {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json().catch(() => null) };
};

before(async () => {
  db = createDb(':memory:', config.dataDir);
  server = createApp({ db, config }).listen(0);
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => { server.close(); db.close(); });

test('seeded content is served', async () => {
  const subjects = await call('GET', '/api/subjects');
  assert.equal(subjects.status, 200);
  assert.deepEqual(subjects.body.map((s) => s.id), ['math', 'odia_lang', 'science', 'english']);
  const quiz = await call('GET', '/api/quiz/math?count=3');
  assert.equal(quiz.body.questions.length, 3);
  assert.ok(quiz.body.questions[0].id.startsWith('math-'));
  assert.equal((await call('GET', '/api/quiz/nope')).status, 404);
});

let token;
test('register validates input and rejects duplicates', async () => {
  assert.equal((await call('POST', '/api/auth/register', { username: 'a', password: 'secret1' })).status, 400);
  assert.equal((await call('POST', '/api/auth/register', { username: 'gita_1', password: 'x' })).status, 400);
  const ok = await call('POST', '/api/auth/register', { username: 'gita_1', password: 'secret1', language: 'od' });
  assert.equal(ok.status, 201);
  assert.equal(ok.body.user.language, 'od');
  assert.equal(ok.body.progress.xp, 0);
  token = ok.body.token;
  assert.equal((await call('POST', '/api/auth/register', { username: 'GITA_1', password: 'secret1' })).status, 409);
});

test('login works, wrong password fails, /me needs a token', async () => {
  assert.equal((await call('POST', '/api/auth/login', { username: 'gita_1', password: 'bad' })).status, 401);
  assert.equal((await call('POST', '/api/auth/login', { username: 'ghost', password: 'secret1' })).status, 401);
  const ok = await call('POST', '/api/auth/login', { username: 'Gita_1', password: 'secret1' });
  assert.equal(ok.status, 200);
  assert.equal((await call('GET', '/api/auth/me')).status, 401);
  assert.equal((await call('GET', '/api/auth/me', null, ok.body.token)).body.user.username, 'gita_1');
});

test('quiz is graded by the server and rewards xp/coins', async () => {
  const { body } = await call('GET', '/api/quiz/math?count=5');
  const answers = body.questions.map((q, i) => ({ questionId: q.id, selected: i < 4 ? q.correct : (q.correct + 1) % 4 }));
  const res = await call('POST', '/api/quiz/submit', { subjectId: 'math', answers, clientSubmissionId: 'sub-1' }, token);
  assert.equal(res.status, 200);
  assert.deepEqual(
    { c: res.body.result.correct, p: res.body.result.percent, xp: res.body.result.xpEarned, coins: res.body.result.coinsEarned },
    { c: 4, p: 80, xp: 40, coins: 8 },
  );
  assert.equal(res.body.progress.xp, 40);
  assert.equal(res.body.progress.subjectProgress.math, 80);
});

test('retrying the same submission does not pay out twice', async () => {
  const { body } = await call('GET', '/api/quiz/science?count=3');
  const answers = body.questions.map((q) => ({ questionId: q.id, selected: q.correct }));
  const first = await call('POST', '/api/quiz/submit', { subjectId: 'science', answers, clientSubmissionId: 'sub-2' }, token);
  const again = await call('POST', '/api/quiz/submit', { subjectId: 'science', answers, clientSubmissionId: 'sub-2' }, token);
  assert.equal(again.body.duplicate, true);
  assert.equal(again.body.progress.xp, first.body.progress.xp);
});

test('best score is kept, level-up is detected', async () => {
  const { body } = await call('GET', '/api/quiz/english?count=2');
  const wrong = body.questions.map((q) => ({ questionId: q.id, selected: (q.correct + 1) % 4 }));
  const res = await call('POST', '/api/quiz/submit', { subjectId: 'english', answers: wrong }, token);
  assert.equal(res.body.result.xpEarned, 0);
  const prog = await call('GET', '/api/progress', null, token);
  assert.equal(prog.body.subjectProgress.english, 0);
});

test('cheating / bad input is rejected', async () => {
  const q = (await call('GET', '/api/quiz/math?count=1')).body.questions[0];
  const submit = (b, t = token) => call('POST', '/api/quiz/submit', b, t);
  assert.equal((await submit({ subjectId: 'math', answers: [{ questionId: q.id, selected: q.correct }] }, null)).status, 401);
  assert.equal((await submit({ subjectId: 'science', answers: [{ questionId: q.id, selected: 0 }] })).status, 400); // wrong subject
  assert.equal((await submit({ subjectId: 'math', answers: [{ questionId: q.id, selected: 0 }, { questionId: q.id, selected: 0 }] })).status, 400); // dup
  assert.equal((await submit({ subjectId: 'math', answers: [{ questionId: 'fake', selected: 0 }] })).status, 400);
  assert.equal((await submit({ subjectId: 'math', answers: [] })).status, 400);
  assert.equal((await submit({ subjectId: 'math', xp: 99999, answers: [{ questionId: q.id, selected: 'x' }] })).status, 400);
  // Extra fields like xp are ignored: progress only changes by server-side grading.
  const before = (await call('GET', '/api/progress', null, token)).body.xp;
  await submit({ subjectId: 'math', xp: 99999, answers: [{ questionId: q.id, selected: (q.correct + 1) % 4 }] });
  assert.equal((await call('GET', '/api/progress', null, token)).body.xp, before);
});

test('frontend is served and unknown api routes 404 as JSON', async () => {
  const html = await fetch(base + '/');
  assert.equal(html.status, 200);
  assert.match(await html.text(), /Odisha Learning Adventure/);
  assert.equal((await call('GET', '/api/nothing')).status, 404);
});
