const express = require('express');
const { readFile } = require('../helpers/readFile');
const { writeFile } = require('../helpers/writeFile');
const { sendResponse } = require('../helpers/sendResponse');
const { validateRegistration } = require('../middleware/validateRegistration');

const auth = express.Router();

auth.post('/register', validateRegistration, async (req, res) => {
    try {
        const data = await readFile('db', 'users.json');
        const users = JSON.parse(data);

        const existingUser = users.find(user => user.email === res.locals.validatedData.email);
        if (existingUser) {
            return sendResponse(res, 400, { message: 'Email already exists' });
        }

        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newUser = {
            id: newId,
            ...res.locals.validatedData
        };

        users.push(newUser);
        await writeFile('db', 'users.json', users);

        sendResponse(res, 201, {
            message: 'User registered successfully',
            user: newUser
        });

    } catch (error) {
        sendResponse(res, 500, { message: 'Error during registration' });
    }
});

auth.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return sendResponse(res, 500, { message: 'Error logging out' });
        }
        sendResponse(res, 200, { message: 'Logged out successfully' });
    });
});


module.exports = { auth };