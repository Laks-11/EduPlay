/**
 * Odisha Learning Adventure - API client.
 *
 * Talks to the Node.js backend. Designed to be OFFLINE-FIRST: every call can fail
 * (no internet in a village school), so callers must always have a local fallback.
 * Quiz results that can't be sent are queued in localStorage and retried later.
 */
(function () {
  const TOKEN_KEY = 'odisha_learning_token';
  const USER_KEY = 'odisha_learning_user';
  const PENDING_KEY = 'odisha_learning_pending';

  // Same-origin by default (backend serves this frontend). Override with
  //   <script>window.ODISHA_API_BASE = 'https://your-api.example.com'</script>
  // before this file if the frontend is hosted elsewhere. Opening index.html straight from
  // disk (file://) or inside Electron falls back to a local server.
  const BASE = window.ODISHA_API_BASE || (location.protocol === 'file:' ? 'http://localhost:3000' : '');

  class ApiError extends Error {
    constructor(message, status, network) {
      super(message);
      this.status = status;     // HTTP status, or 0 when the server could not be reached
      this.network = network;   // true when offline / timeout / server down
    }
  }

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, val) { try { localStorage.setItem(key, val); } catch { /* storage full/blocked */ } },
    del(key) { try { localStorage.removeItem(key); } catch { /* ignore */ } },
    getJson(key, fallback) {
      try {
        const v = JSON.parse(localStorage.getItem(key));
        return v === null || v === undefined ? fallback : v;
      } catch { return fallback; }
    },
  };

  async function request(path, { method = 'GET', body, auth = false, timeout = 6000 } = {}) {
    if (navigator.onLine === false) throw new ApiError('Offline', 0, true);

    const headers = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (auth) {
      const token = store.get(TOKEN_KEY);
      if (!token) throw new ApiError('Please sign in.', 401, false);
      headers.Authorization = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    let res;
    try {
      res = await fetch(BASE + path, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
    } catch {
      throw new ApiError('Cannot reach the server.', 0, true);
    } finally {
      clearTimeout(timer);
    }

    let data = null;
    try { data = await res.json(); } catch { /* empty / non-JSON body */ }
    if (!res.ok) {
      if (res.status === 401 && auth) { store.del(TOKEN_KEY); store.del(USER_KEY); }
      // A 5xx from a dead proxy / crashed server is treated like "offline" so the app falls back gracefully.
      throw new ApiError((data && data.error) || `Request failed (${res.status})`, res.status, res.status >= 500);
    }
    return data;
  }

  function saveSession(data) {
    store.set(TOKEN_KEY, data.token);
    store.set(USER_KEY, JSON.stringify(data.user));
  }

  function newId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  const OdishaAPI = {
    ApiError,

    // ---- session ----
    isLoggedIn() { return !!store.get(TOKEN_KEY) && !!store.getJson(USER_KEY, null); },
    getUser() { return this.isLoggedIn() ? store.getJson(USER_KEY, null) : null; },
    logout() { store.del(TOKEN_KEY); store.del(USER_KEY); },

    async register(username, password, language) {
      const data = await request('/api/auth/register', { method: 'POST', body: { username, password, language } });
      saveSession(data);
      return data;
    },
    async login(username, password) {
      const data = await request('/api/auth/login', { method: 'POST', body: { username, password } });
      saveSession(data);
      return data;
    },
    async me() {
      const data = await request('/api/auth/me', { auth: true });
      store.set(USER_KEY, JSON.stringify(data.user));
      return data;
    },
    saveLanguage(language) {
      if (!this.isLoggedIn()) return;
      request('/api/auth/me', { method: 'PATCH', body: { language }, auth: true }).catch(() => {});
    },

    // ---- content ----
    fetchQuiz(subjectId, count) {
      return request(`/api/quiz/${encodeURIComponent(subjectId)}?count=${count}`, { timeout: 2500 });
    },

    // ---- quiz results ----
    /**
     * Sends a finished quiz. If the server can't be reached the result is queued and an
     * ApiError with `queued = true` is thrown so the caller can fall back to local scoring.
     */
    async submitQuiz({ subjectId, answers }) {
      const user = this.getUser();
      const payload = { subjectId, answers, clientSubmissionId: newId() };
      try {
        return await request('/api/quiz/submit', { method: 'POST', body: payload, auth: true });
      } catch (err) {
        if (err.network && user) {
          const pending = store.getJson(PENDING_KEY, []);
          pending.push({ userId: user.id, payload });
          store.set(PENDING_KEY, JSON.stringify(pending));
          err.queued = true;
        }
        throw err;
      }
    },

    /** Retry queued quiz results for the signed-in user. Returns latest progress or null. */
    async flushPending() {
      const user = this.getUser();
      if (!user) return null;
      let pending = store.getJson(PENDING_KEY, []);
      let latest = null;
      for (const item of pending.filter((p) => p.userId === user.id)) {
        try {
          const res = await request('/api/quiz/submit', { method: 'POST', body: item.payload, auth: true });
          latest = res.progress;
        } catch (err) {
          if (err.network || err.status === 401) break;   // try again later
          // Any other 4xx means the server will never accept it - drop it.
        }
        pending = pending.filter((p) => p !== item);
        store.set(PENDING_KEY, JSON.stringify(pending));
      }
      return latest;
    },
  };

  window.OdishaAPI = OdishaAPI;
})();
