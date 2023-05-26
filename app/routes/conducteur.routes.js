module.exports = (app) => {
    const conducteurs = require('../controllers/conducteur.controller.js');


    app.post('/conducteurs', conducteurs.create);


    app.get('/conducteurs', conducteurs.findAll);


    app.get('/conducteurs/:conducteurId', conducteurs.findOne);

    app.post("/login_drivers", conducteurs.login);

    app.put('/conducteurs/:conducteurId', conducteurs.update);


    app.delete('/conducteurs/:conducteurId', conducteurs.delete);
}
