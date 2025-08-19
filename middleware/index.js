const { readData } = require("./readData");
const { validateEmail } = require("./validateEmail");
const { validatePassword } = require("./validatePassword");
const { validateName } = require("./validateName");
const { validateAge } = require("./validateAge");
const { validateRegistration } = require("./validateRegistration");
const { validateLogin } = require("./validateLogin");

module.exports = {
    readData,
    validateEmail,
    validatePassword,
    validateName,
    validateAge,
    validateRegistration,
    validateLogin
};