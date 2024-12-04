
const admin = require('../config/firebase');

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


const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token is not provided' });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        const message =
            error.code === 'auth/argument-error'
                ? 'Invalid token format'
                : 'Invalid or expired token';
        return res.status(403).json({ message });
    }
};

module.exports = { checkRole, verifyToken };
