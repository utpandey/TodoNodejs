const express = require('express');
const app = express()
const cors = require('cors')
const serverConfig = require('./config');
const todoRoutes = require('./routes/todoRoutes');
const mongoose = require('mongoose');
const server = require('./models');

mongoose.connect(server.connectionUri, server.connectionOptions)
    .then(() => console.log('Connection to database has been established'))
    .catch((error) => console.log('Connection could not be established', error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(todoRoutes)

mongoose.connection.on('connected', () => {
    console.log("connected to mongo")
})
mongoose.connection.on('error', (err) => {
    console.log("This is error", err)
})

// Set up a .env with environment variables to use below
app.listen(serverConfig.port, () => {
    console.log("Server running: " + serverConfig.port)
})