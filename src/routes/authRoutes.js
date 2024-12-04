const express = require('express');
const { login, register } = require('../controllers/authController');
const authSchema = require('../schemas/authSchema');
const validator = require('../middlewares/joiValidatoriMiddleware');

const router = express.Router();
router.post('/login', validator(authSchema.login, "body"), login);
router.post('/register', validator(authSchema.login, "body"), register);

module.exports = router;
