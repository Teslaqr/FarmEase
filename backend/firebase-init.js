// const admin = require('firebase-admin');
// const dotenv = require('dotenv');
// dotenv.config();

// const serviceAccount = require('./serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.FIREBASE_DATABASE_URL
// });

// const db = admin.database();
// module.exports = db;

const admin = require('firebase-admin');
require('dotenv').config();

let serviceAccount;

try {
  // Decode base64 → get valid JSON string
  const jsonStr = Buffer.from(process.env.SERVICE_ACCOUNT_KEY, 'base64').toString('utf8');
  serviceAccount = JSON.parse(jsonStr);
} catch (error) {
  console.error('❌ Failed to parse SERVICE_ACCOUNT_KEY. Ensure it is base64-encoded JSON.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();
module.exports = db;
