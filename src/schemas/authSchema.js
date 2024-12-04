const Joi = require('joi');

const authSchema = {
    login: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),
        password: Joi.string()
            .min(8)
            .max(32)
            .regex(/^[A-Za-z0-9!@#$%^&*()_+=-]*$/) // Example for alphanumeric with special characters
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.max': 'Password cannot exceed 32 characters',
                'string.pattern.base': 'Password can only contain letters, numbers, and special characters',
                'any.required': 'Password is required',
            }),
    }),
};

module.exports = authSchema;