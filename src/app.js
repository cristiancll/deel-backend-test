const express = require('express');
const bodyParser = require('body-parser');

// Database
const {sequelize} = require('./config/db.js')

// Routes
const contractRoutes = require('./routes/contract.js')

// Models Associations
require('./app/associations.js')

// App initialization
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

// Routes
app.use('/contracts', contractRoutes)

module.exports = app;
