const express = require('express');
const { readFile } = require('../helpers/readFile');
const { sendResponse } = require('../helpers/sendResponse');
const { validateLogin } = require('../middleware/validateLogin');

const login = express.Router();

login.post('/', validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await readFile('db', 'users.json');
        const users = JSON.parse(data);

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return sendResponse(res, 401, { message: 'Invalid email or password' });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        sendResponse(res, 200, {
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        sendResponse(res, 500, { message: 'Error during login' });
    }
});

module.exports = { login };