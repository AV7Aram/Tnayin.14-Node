const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .pattern(/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/)
        .required()
        .messages({
            'string.pattern.base': 'Name must start with capital letters for each word',
            'string.empty': 'Name is required',
            'any.required': 'Name is required'
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required'
        }),

    password: Joi.string()
        .min(5)
        .pattern(/[A-Z]/)
        .pattern(/[^A-Za-z0-9]/)
        .required()
        .messages({
            'string.min': 'Password must be at least 5 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter and one special character',
            'string.empty': 'Password is required'
        }),

    repeat_password: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'string.empty': 'Repeat password is required'
        }),

    age: Joi.number()
        .integer()
        .min(18)
        .max(65)
        .required()
        .messages({
            'number.base': 'Age must be a number',
            'number.min': 'Age must be at least 18',
            'number.max': 'Age must be at most 65',
            'any.required': 'Age is required'
        })
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required'
        })
});

module.exports = {
    userSchema,
    loginSchema
};