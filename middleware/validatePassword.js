const { sendResponse } = require('../helpers/sendResponse');

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    const user = res.locals.user;

    if (!password) {
        return sendResponse(res, 400, { message: 'Password is required' });
    }

    if (password.length < 5) {
        return sendResponse(res, 400, { message: 'Password must be at least 5 characters long' });
    }

    if (!/[A-Z]/.test(password)) {
        return sendResponse(res, 400, { message: 'Password must contain at least one uppercase letter' });
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return sendResponse(res, 400, { message: 'Password must contain at least one special character' });
    }

    if (user.password !== password) {
        return sendResponse(res, 401, { message: 'Invalid password' });
    }

    next();
};

module.exports = {
    validatePassword
};
