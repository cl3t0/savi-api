// Importing some important libs
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');


// Initializing the app using express
const app = express();
// Enabling to use json
app.use(express.json());

// Initializing database
mongoose.connect('mongodb://localhost:27017/savi', { useNewUrlParser: true });
// Importing models from the model's folder
requireDir('./src/models');

// Routes
app.use('/api', require('./src/routes'));
// Choosing the port to listen
app.listen(3001);