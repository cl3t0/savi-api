const express = require('express');
const routes = express.Router();

const ResourcesController = require('./controllers/ResourcesController');

routes.get('/resources', ResourcesController.index);
routes.post('/resources', ResourcesController.store);
routes.delete('/resources', ResourcesController.destroy);

module.exports = routes;
