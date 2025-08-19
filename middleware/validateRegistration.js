const { sendResponse } = require('../helpers/sendResponse');
const { userSchema } = require('../schema/schema');

const validateRegistration = (req, res, next) => {
    const { error, value } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return sendResponse(res, 400, {
            message: 'Validation failed',
            errors
        });
    }

    const { repeat_password, ...userData } = value;
    res.locals.validatedData = userData;
    next();
};

module.exports = {
    validateRegistration
};