const { sendResponse } = require('../helpers/sendResponse');

const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return sendResponse(res, 400, { message: 'Name is required' });
    }

    if (name !== name.charAt(0).toUpperCase() + name.slice(1)) {
        return sendResponse(res, 400, { message: 'Name must start with a capital letter' });
    }

    next();
};

module.exports = {
    validateName
};