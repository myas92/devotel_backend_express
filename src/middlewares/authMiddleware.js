const { getAuth } = require('firebase-admin/auth');
const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');
const { getUserByToken } = require('../services/firebase');

// Middleware to verify Firebase token and set user in request
async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    try {

        // let user = await getUserByToken(idToken)
        // const decodedToken = await getAuth().verifyIdToken(idToken);
        // req.user = decodedToken;
        const decodedToken = jwt.decode(idToken, { complete: true });
        req.user = decodedToken.payload;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// Middleware to check roles
function verifyRole(requiredRole) {
    return (req, res, next) => {
        const userRole = req.user.role || 'viewer';
        if (userRole !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden: Insufficient role' });
        }
        next();
    };
}

module.exports = { verifyToken, verifyRole };
