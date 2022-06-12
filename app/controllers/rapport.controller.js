const Rapport = require("../models/rapport.model");

// Create and Save a new rapport
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    return res.status(400).send({
      message: "rapport content can not be empty",
    });
  }

  // Create a rapport
  const rapport = new Rapport({
    userId: req.body.userId,
    conducteurId: req.body.conducteurId,
    email: req.body.email,
    sujet: req.body.sujet,  
    rapport: req.body.rapport,
  });

  // Save rapport in the database
  rapport
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating this rapport.",
      });
    });
};

// Retrieve and return all rapport from the database.
exports.findAll = (req, res) => {
  Rapport.find()
    .then((rapports) => {
      res.send(rapports);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rapports.",
      });
    });
};

// Find a single rapport with a rapportId
exports.findOne = (req, res) => {
  Rapport.findById(req.params.rapportId)
    .then((rapport) => {
      if (!rapport) {
        return res.status(404).send({
          message: "rapport not found with id " + req.params.rapportId,
        });
      }
      res.send(rapport);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "rapport not found with id " + req.params.rapportId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving rapport with id " + req.params.rapportId,
      });
    });
};

// Update a rapport identified by the rapportId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.userId && !req.body.consucteurId) {
    return res.status(400).send({
      message: "rapport content can not be empty",
    });
  }

  // Find rapport and update it with the request body
  Rapport.findByIdAndUpdate(
    req.params.rapportId,
    {
      userId: req.body.userId,
      voyageId: req.body.consucteurId,
      sujet: req.body.sujet,
      rapport: req.body.rapport,
    },
    { new: true }
  )
    .then((rapport) => {
      if (!rapport) {
        return res.status(404).send({
          message: "rapport not found with id " + req.params.rapportId,
        });
      }
      res.send(rapport);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "rapport not found with id " + req.params.rapportId,
        });
      }
      return res.status(500).send({
        message: "Error updating rapport with id " + req.params.rapportId,
      });
    });
};

// Delete a rapport with the specified rapportId in the request
exports.delete = (req, res) => {
  Rapport.findByIdAndRemove(req.params.rapportId)
    .then((rapport) => {
      if (!rapport) {
        return res.status(404).send({
          message: "rapport not found with id " + req.params.rapportId,
        });
      }
      res.send({ message: "rapport deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "rapport not found with id " + req.params.rapportId,
        });
      }
      return res.status(500).send({
        message: "Could not delete rapport with id " + req.params.rapportId,
      });
    });
};
