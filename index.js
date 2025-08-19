const express = require('express');
const { home, users, error, login } = require('./routes');
const app = express();

app.use(express.json());
app.use(express.static('pages/home'))
app.use(express.static('pages/error'))

require('dotenv').config()

app.use('/', home);
app.use('/api', users);
app.use('/login', login)
app.use(error)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})