const admin = require('firebase-admin');
const serviceAccount = require('./../../secrets/firebase-service-account.json.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
