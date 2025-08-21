const express = require('express');
const { readFile } = require('../helpers/readFile')
const { writeFile } = require('../helpers/writeFile');
const { sendResponse } = require('../helpers/sendResponse');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

const products = express.Router();
const FILE_NAME = 'products.json';
const FILE_FOLDER = 'db';

products.get('/', requireAuth, async (req, res) => {
    const data = await readFile(FILE_FOLDER, FILE_NAME);
    const products = JSON.parse(data);
    sendResponse(res, 200, products);
});

products.post('/', requireAuth, requireRole('admin'), async (req, res) => {
    const { name, price } = req.body;
    const data = await readFile(FILE_FOLDER, FILE_NAME);
    const products = JSON.parse(data);

    const newProduct = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price
    };

    products.push(newProduct);
    await writeFile(FILE_FOLDER, FILE_NAME, products);
    sendResponse(res, 201, { message: 'Product created', product: newProduct });
});

products.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
    let products = JSON.parse(await readFile(FILE_FOLDER, FILE_NAME));
    const id = parseInt(req.params.id);

    const updated = products.filter(p => p.id !== id);
    await writeFile(FILE_FOLDER, FILE_NAME, updated);

    sendResponse(res, 200, { message: 'Product deleted' });
});

products.put('/:id', requireAuth, requireRole('admin'), async (req, res) => {
    let products = JSON.parse(await readFile(FILE_FOLDER, FILE_NAME));
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return sendResponse(res, 404, { message: 'Product not found' });
    }

    products[index] = { ...products[index], ...req.body };
    await writeFile(FILE_FOLDER, FILE_NAME, products);

    sendResponse(res, 200, { message: 'Product updated', product: products[index] });
});

module.exports = {
    products
};
