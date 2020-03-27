const express    = require('express');
const routes     = express.Router();
const { Joi, celebrate, Segments } = require('celebrate');

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
routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name     : Joi.string().required(),
        email    : Joi.string().required().email(),
        whatsapp : Joi.number().required().min(10).max(11),
        city     : Joi.string().required(),
        if       : Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page : Joi.number()
    })
}), IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentsController.delete);

module.exports = routes;