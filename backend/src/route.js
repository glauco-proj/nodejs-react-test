const express    = require('express');
const routes     = express.Router();

const OngController       = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController   = require('./controllers/ProfileController');
const SessionController   = require('./controllers/SessionController');

//Query params:
//http://localhost:3333/user?name=Glauco
//request.query.name

//Route params:
//http://localhost:3333/user/1
//request.params.id

//Request Body
//http://localhost:3333/user
//{"name":"Glauco"}
//request.body.name

routes.post('/sessions', SessionController.create);

routes.get('/ongs',  OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes;