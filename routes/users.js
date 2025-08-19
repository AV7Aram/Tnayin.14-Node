const express = require('express');
const { readData } = require('../middleware/readData');
const { sendResponse } = require('../helpers/sendResponse');

const users = express.Router();

users.get('/users', readData, async (req, res) => {
    const { users } = res.locals;
    const { name, age } = req.query;
    let filteredUsers = users;
    if (name) {
        filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (age) {
        if (age === 'min') {
            filteredUsers = filteredUsers.toSorted((a, b) => a.age - b.age)
        } else if (age === 'max') {
            filteredUsers = filteredUsers.toSorted((a, b) => b.age - a.age)
        }
    }

    if (filteredUsers.length > 0) {
        sendResponse(res, 200, filteredUsers);
    } else {
        sendResponse(res, 404, { message: 'No users found' });
    }
});

users.get('/api/users/:id', readData, async (req, res) => {
    const { id } = req.params;
    const { users } = res.locals;
    const user = users.find(user => user.id === parseInt(id));

    if (user) {
        sendResponse(res, 200, user);
    } else {
        sendResponse(res, 404, { message: 'User not found' });
    }
});

module.exports = { users };