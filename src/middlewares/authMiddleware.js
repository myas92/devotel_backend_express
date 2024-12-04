
const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');

const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token is not provided' });
        }
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            if (!allowedRoles.includes(decodedToken.role)) {
                return res.status(403).json({ message: 'Access Denied' });
            }
            req.user = decodedToken;

            next();
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    };
};


async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    try {

        const decodedToken = await getAuth().verifyIdToken(idToken);
        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = { checkRole, verifyToken };
