const config = require('./config');
const { createDb } = require('./db');
const { createApp } = require('./app');

const db = createDb(config.dbPath, config.dataDir);
const app = createApp({ db, config });

const server = app.listen(config.port, () => {
  console.log(`Odisha Learning Adventure running at http://localhost:${config.port}`);
});

function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
