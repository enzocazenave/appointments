const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');
const dbConnection = require('./database/config');

dotenv.config();

const { PORT } = process.env;
const app = express();

dbConnection();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/shops', require('./routes/shop'));
app.use('/api/users', require('./routes/user'));

app.listen(PORT, () => {
    console.log(`\nSTARTING BACKEND\n✔  http://localhost:${ PORT }`);
});