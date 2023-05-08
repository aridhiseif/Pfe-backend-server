module.exports = (app) => {
    const clients = require('../controllers/client.controller.js');


    app.post('/clients', clients.create);


    app.get('/clients', clients.findAll);


    app.get('/clients/:clientId', clients.findOne);

    app.post("/login_clients", clients.login);

    app.put('/clients/:clientId', clients.update);


    app.delete('/clients/:clientId', clients.delete);
}
