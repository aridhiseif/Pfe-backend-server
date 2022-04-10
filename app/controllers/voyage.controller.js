const Voyage = require("../models/voyage.model.js");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.conducteurId) {
    return res.status(400).send({
      message: "conducteur content can not be empty",
    });
  }

  // Create a admin
  const voyage = new Voyage({
    conducteurId: req.body.conducteurId,
    start: req.body.start,
    distination: req.body.distination,
    date: req.body.date,
    heure: req.body.heure,
  });

  // Save admin in the database
  voyage
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the admin.",
      });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
  Voyage.find()
    .then((voyages) => {
      res.send(voyages);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
  Voyage.findById(req.params.voyageId)
    .then((voyage) => {
      if (!voyage) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.voyageId,
        });
      }
      res.send(voyage);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.voyageId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.voyageId,
      });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.firstname) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Find admin and update it with the request body
  Voyage.findByIdAndUpdate(
    req.params.voyageId,
    {
      start: req.body.start,
      distination: req.body.distination,
      date: req.body.date,
      heure: req.body.heure,
    },
    { new: true }
  )
    .then((voyage) => {
      if (!voyage) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.voyageId,
        });
      }
      res.send(voyage);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.voyageId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.voyageId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Voyage.findByIdAndRemove(req.params.voyageId)
    .then((voyage) => {
      if (!voyage) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.voyageId,
        });
      }
      res.send({ message: "admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.voyageId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.voyageId,
      });
    });
};
