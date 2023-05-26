const Conducteur = require('../models/conducteur.model.js');

// Create and Save a new conducteur
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstname) {
        return res.status(400).send({
            message: "conducteur content can not be empty"
        });
    }
    // Create a conducteur
    const conducteur = new Conducteur({
        firstname: req.body.firstname || "Untitled conducteur",
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        tel: req.body.tel,
        etat: req.body.etat
    });

    // Save conducteur in the database
    conducteur.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the conducteur."
            });
        });
};

// Retrieve and return all conducteur from the database.
exports.findAll = (req, res) => {
    Conducteur.find()
        .then(conducteurs => {
            res.send(conducteurs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving conducteurs."
            });
        });
};

// Find a single conducteur with a conducteurId
exports.findOne = (req, res) => {
    Conducteur.findById(req.params.conducteurId)
        .then(conducteur => {
            if (!conducteur) {
                return res.status(404).send({
                    message: "conducteur not found with id " + req.params.conducteurId
                });
            }
            res.send(conducteur);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "conducteur not found with id " + req.params.conducteurId
                });
            }
            return res.status(500).send({
                message: "Error retrieving conducteur with id " + req.params.conducteurId
            });
        });
};
//find one with credentials;
exports.login = (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "email can not be empty"
        })
    }
    console.log(`
    email:${req.body.email},
    password:${req.body.password}
    `)
    Conducteur.find({ 'email': req.body.email, 'password': req.body.password })
        .then((client) => {
            if (!client) {
                return res.status(404).send({
                    message: "no client with these credantials"
                })
            }
            console.log(client);
            return res.status(200).send(client);
        })
}
// Update a conducteur identified by the conducteurId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.firstname) {
        return res.status(400).send({
            message: "conducteur content can not be empty"
        });
    }

    // Find conducteur and update it with the request body
    Conducteur.findByIdAndUpdate(req.params.conducteurId, {
        username: req.body.username || "Untitled conducteur",
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password
    }, { new: true })
        .then(conducteur => {
            if (!conducteur) {
                return res.status(404).send({
                    message: "conducteur not found with id " + req.params.conducteurId
                });
            }
            res.send(conducteur);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "conducteur not found with id " + req.params.conducteurId
                });
            }
            return res.status(500).send({
                message: "Error updating conducteur with id " + req.params.conducteurId
            });
        });
};

// Delete a conducteur with the specified conducteurId in the request
exports.delete = (req, res) => {
    Conducteur.findByIdAndRemove(req.params.conducteurId)
        .then(conducteur => {
            if (!conducteur) {
                return res.status(404).send({
                    message: "conducteur not found with id " + req.params.conducteurId
                });
            }
            res.send({ message: "conducteur deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "conducteur not found with id " + req.params.conducteurId
                });
            }
            return res.status(500).send({
                message: "Could not delete conducteur with id " + req.params.conducteurId
            });
        });
};
