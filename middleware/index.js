const { readData } = require("./readData");
const { validateRegistration } = require("./validateRegistration");
const { validateLogin } = require("./validateLogin");

module.exports = {
    readData,
    validateRegistration,
    validateLogin
};