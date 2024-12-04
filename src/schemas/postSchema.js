const Joi = require('joi');

const postSchema = {
    posts: Joi.object().keys({
        title: Joi.string().min(3).max(100).required().messages({
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title cannot exceed 100 characters',
            'any.required': 'Title is required',
        }),
        content: Joi.string().min(10).required().messages({
            'string.min': 'Content must be at least 10 characters long',
            'any.required': 'Content is required',
        }),
        image: Joi.optional()
    }),
};

module.exports = postSchema;
