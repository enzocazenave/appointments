const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`\nSTARTING BACKEND\n✔  http://localhost:${ PORT }`);
});