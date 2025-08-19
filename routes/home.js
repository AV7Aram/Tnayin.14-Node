const express = require('express');
const { readFile } = require('../helpers/readFile');
const { sendResponse } = require('../helpers/sendResponse');

const home = express.Router();

home.get('/', async (req, res) => {
    const html = await readFile('pages/home', 'index.html');
    sendResponse(res, 200, html, 'text/html');
})

module.exports = { home };