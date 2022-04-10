const Client = require('../models/client.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstname) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Create a admin
    const client = new Client({
        firstname: req.body.firstname || "Untitled Admin", 
        lastname : req.body.lastname,
        email : req.body.email,
        password: req.body.password,
        etat : req.body.etat
    });

    // Save admin in the database
    client.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the admin."
        });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
    Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving admins."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.clientId
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.clientId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstname) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
        username: req.body.username || "Untitled admin", 
        email : req.body.email,
        password: req.body.password
    }, {new: true})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.clientId
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.clientId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.clientId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.clientId
        });
    });
};
