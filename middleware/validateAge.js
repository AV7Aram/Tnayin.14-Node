const { sendResponse } = require('../helpers/sendResponse');

const validateAge = (req, res, next) => {
    const { age } = req.body;
    
    if (!age) {
        return sendResponse(res, 400, { message: 'Age is required' });
    }

    if (typeof age !== 'number' || isNaN(age)) {
        return sendResponse(res, 400, { message: 'Age must be a number' });
    }

    if (age < 18 || age > 65) {
        return sendResponse(res, 400, { message: 'Age must be between 18 and 65' });
    }

    next();
};

module.exports = {
    validateAge
};