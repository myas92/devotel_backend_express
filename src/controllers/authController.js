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
            { headers: { 'User-Agent': 'whatever' } }
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
    const role = 'user'

    if (!email || !password) {
        return res.status(400).json({ error: 'Email, password are required' });
    }

    try {
        const existingUser = await admin.auth().getUserByEmail(email);
        if (existingUser) {
            console.log(`User already exists: ${email}`);
            return res.status(400).json({ error: 'User already exists' });
        }
    } catch (error) {
        if (error.code !== 'auth/user-not-found') {
            console.error('Error checking user:', error);
            return res.status(500).json({ message: 'Error checking user' });
        }
    }
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password: password,
        });
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: role });
        return res.status(201).json({ data: { email, role } });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Error creating user' });
    }
}

module.exports = { login, register };