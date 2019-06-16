const express = require('express');
const routes = express.Router();

const ResourcesController = require('./controllers/ResourcesController');
const UsersController = require('./controllers/UsersController');

routes.get('/resources', ResourcesController.index);
routes.post('/resources', ResourcesController.store);
routes.delete('/resources', ResourcesController.destroy);

routes.get('/user', UsersController.login);
routes.post('/user', UsersController.register);

module.exports = routes;