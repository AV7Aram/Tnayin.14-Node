const { sendResponse } = require('../helpers/sendResponse');
const { loginSchema } = require('../schema/schema');

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return sendResponse(res, 400, {
            message: 'Validation failed',
            errors
        });
    }

    next();
};

module.exports = {
    validateLogin
};