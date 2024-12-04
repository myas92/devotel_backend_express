const axios = require('axios');
async function getUserByToken(idToken) {


    if (!idToken) {
        return res.status(400).json({ error: 'idToken are required' });
    }

    try {
        const {data} = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`,
            {
                idToken
            }
        );

        return data.users[0]
    } catch (error) {
        const errorMessage = error.response?.data?.error?.message || 'Authentication failed';
        return { error: errorMessage };
    }
}



module.exports = { getUserByToken };