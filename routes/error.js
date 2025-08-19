const express = require('express');
const { readFile } = require('../helpers/readFile');
const { sendResponse } = require('../helpers/sendResponse');

const error = express.Router();

error.use(async (req, res) => {
    try {
        const errorPage = await readFile('pages/error', 'error.html');
        sendResponse(res, 404, errorPage, 'text/html');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = {error};
