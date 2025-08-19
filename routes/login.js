const express = require('express');
const { sendResponse } = require('../helpers/sendResponse');
const { validateName, validateAge, validateEmail, validatePassword } = require('../middleware');

const login = express.Router();

login.post('/users', [validateName, validateAge, validateEmail, validatePassword], (req, res) => {
    const user = res.locals.user;
    sendResponse(res, 200, { message: 'Login successful', user });
}
);

module.exports = { login };
