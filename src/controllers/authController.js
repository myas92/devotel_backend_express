const axios = require("axios");
const admin = require('../config/firebase');
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
async function login(req, res) {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            },
            {headers: {'User-Agent': 'whatever'}}
        );


        res.json({
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.error?.message || 'Authentication failed';
        res.status(401).json({ error: errorMessage });
    }
}


async function register(req, res) {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const userRecord = await admin.auth().createUser({
            email: adminUser.email,
            password: adminUser.password,
        });
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: adminUser.role });

        res.json({
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.error?.message || 'Authentication failed';
        res.status(401).json({ error: errorMessage });
    }
}



module.exports = { login , register};