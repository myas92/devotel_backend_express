const Joi = require('joi');

const validator = (schema, property) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req[property], { abortEarly: false });
            next();
        } catch (error) {
            const { details } = error;
            const message = details.map((i) => i.message).join(', ');
            return res.status(422).json({ error: message });
        }
    };
};

module.exports = validator;
