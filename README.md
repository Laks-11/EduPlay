EduPlay
 Overview
EduPlay is a gamified learning platform developed to support primary education in rural and low-connectivity regions. The project focuses on creating an engaging, accessible, and child-friendly digital learning experience that enhances foundational literacy and numeracy skills.
 
 Features
* Offline-first learning experience
* Interactive educational activities and quizzes
* Gamified learning modules for better engagement
* Multilingual accessibility support
* Simple and child-friendly interface
* Lightweight design for low-resource environments

 Vision
EduPlay aims to bridge the digital learning gap by making quality education more accessible, interactive, and inclusive for young learners in underserved communities.

 Future Scope
* AI-assisted personalized learning
* Smart progress tracking and analytics
* Voice-assisted learning support
* Expanded regional language support
* Parent and teacher monitoring dashboards
  
 Project Status
Prototype version developed for academic research and educational innovation purposes.

---

## Running the app (frontend + Node.js backend)

An offline-first, gamified learning platform for children in Odisha — quizzes in **English, ଓଡ଼ିଆ and हिंदी** with XP, coins and levels.

* **`frontend/`** – plain HTML/CSS/JS app (works offline; guests keep progress on the device)
* **`backend/`** – Node.js + Express + SQLite API: accounts, server-graded quizzes, synced progress

```
EduPlay/
├── frontend/            index.html, app.js, api-client.js, style.css, auth.css, ...
├── backend/
│   ├── src/             app.js, server.js, config.js, routes/, middleware/, db/
│   ├── data/            subjects.json, questions.json (seed content), game-config.json, translations.json
│   └── test/            API tests (node:test)
├── docs/                original planning / packaging notes
└── .github/workflows/   CI (runs backend tests on every push)
```

### Run it

Requires **Node.js 18+**.

```bash
npm run setup          # installs backend dependencies
cp backend/.env.example backend/.env     # then set JWT_SECRET (see file)
npm start              # http://localhost:3000  (serves the frontend AND the API)
npm test               # backend test-suite
```

`npm run dev` restarts the server on file changes.

### How the frontend and backend work together

| Situation | Behaviour |
|---|---|
| **Guest** (not signed in) | Exactly as before: questions bundled in `app.js`, progress in `localStorage`. |
| **Signed in, online** | Questions come from the API; when a quiz finishes the server **re-grades it** and returns the official XP/coins/level. |
| **Signed in, offline** | Bundled questions are used and rewards shown immediately; the result is queued and sent automatically when the connection returns (safe to retry – never counted twice). |

### API

All bodies are JSON. Protected routes need `Authorization: Bearer <token>`.

| Method & path | Auth | Purpose |
|---|---|---|
| `GET /api/health` | – | Liveness check |
| `POST /api/auth/register` | – | `{username, password, language?}` → `{token, user, progress}` |
| `POST /api/auth/login` | – | `{username, password}` → `{token, user, progress}` |
| `GET /api/auth/me` | ✔ | Current user + progress |
| `PATCH /api/auth/me` | ✔ | `{language}` – save preferred language |
| `GET /api/subjects` · `/api/config` · `/api/translations` | – | App content |
| `GET /api/quiz/:subjectId?count=5` | – | Random questions for a subject |
| `POST /api/quiz/submit` | ✔ | `{subjectId, answers:[{questionId, selected}], clientSubmissionId?}` → graded result + progress |
| `GET /api/progress` · `/api/progress/history` | ✔ | XP/coins/level/subject scores · last 50 quizzes |

#### Adding or editing questions
Edit `backend/data/questions.json` (ids look like `math-6`) and restart the server – content is re-seeded on every start. To keep the offline fallback in sync, add the same question to `appData.quizQuestions` in `frontend/app.js` (same order, so the ids match).

### Configuration (`backend/.env`)

| Variable | Default | Notes |
|---|---|---|
| `PORT` | `3000` | |
| `JWT_SECRET` | *(random per start in dev)* | **Required in production** |
| `JWT_EXPIRES_IN` | `7d` | |
| `DB_PATH` | `backend/storage/odisha.db` | Put this on a persistent disk when deploying |
| `CORS_ORIGIN` | *(none)* | Only if the frontend is hosted on a different origin; also set `window.ODISHA_API_BASE` in `index.html` |

### Known limitations / next steps
* Progress made as a **guest is not merged** into an account on sign-up.
* Error messages from the server are English only.
* A signed-in user could still submit the same easy quiz repeatedly; submissions are rate-limited (20 per 5 min) but there is no per-quiz session token yet.
* The Odia text added for the sign-in screen should be reviewed by a native speaker.
