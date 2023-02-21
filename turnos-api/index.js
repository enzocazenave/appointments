const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');
const dbConnection = require('./database/config');
const { createServer } = require('http');
const { Server } = require('socket.io');
const socketConnection = require('./socket/connection');

dotenv.config();

const { PORT_EXPRESS, PORT_IO } = process.env;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', (socket) => socketConnection(socket, io));

dbConnection();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/shops', require('./routes/shop'));
app.use('/api/users', require('./routes/user'));
app.use('/api/notifications', require('./routes/notification'));

app.listen(PORT_EXPRESS, () => {
    console.log(`\nSTARTING EXPRESS SERVER\n✔  http://localhost:${ PORT_EXPRESS }`);
});

httpServer.listen(PORT_IO, () => {
    console.log(`\nSTARTING SOCKET SERVER\n✔  http://localhost:${ PORT_IO }`);
});