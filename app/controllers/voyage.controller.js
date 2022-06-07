const Voyage = require("../models/voyage.model.js");

// Create and Save a new voyage
exports.create = (req, res) => {
  // Validate request
  if (!req.body.conducteurId) {
    return res.status(400).send({
      message: "conducteur content can not be empty",
    });
  }

  // Create a voyage
  const voyage = new Voyage({
    conducteurId: req.body.conducteurId,
    mat: req.body.mat,
    depart: req.body.depart,
    fin: req.body.fin,
    nom: req.body.nom,
    marque: req.body.marque,
    nbdeplace: req.body.nbdeplace,
    datec: req.body.datec,
    heure: req.body.heure,
    features: req.body.features,
    prixvoyage: req.body.prixvoyage,
    archive: req.body.archive,
  });

  // Save voyage in the database
  voyage
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the voyage.",
      });
    });
};

// Retrieve and return all voyage from the database.
exports.findAll = (req, res) => {
  Voyage.find()
    .then((voyages) => {
      res.send(voyages);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving voyages.",
      });
    });
};

// Find a single voyage with a voyageId
exports.findOne = (req, res) => {
  Voyage.findById(req.params.voyageId)
    .then((voyage) => {
      if (!voyage) {
        return res.status(404).send({
          message: "voyage not found with id " + req.params.voyageId,
        });
      }
      res.send(voyage);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "voyage not found with id " + req.params.voyageId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving voyage with id " + req.params.voyageId,
      });
    });
};

// Update a voyage identified by the voyageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.conducteurId) {
    return res.status(400).send({
      message: "voyage content can not be empty",
    });
  }

  // Find voyage and update it with the request body
  Voyage.findByIdAndUpdate(
    req.params.voyageId,
    {
      conducteurId: req.body.conducteurId,
      mat: req.body.mat,
      depart: req.body.depart,
      fin: req.body.fin,
      nom: req.body.nom,
      marque: req.body.marque,
      nbdeplace: req.body.nbdeplace,
      datec: req.body.datec,
      heure: req.body.heure,
      features: req.body.features,
      prixvoyage: req.body.prixvoyage,
      archive: req.body.archive,
    },
    { new: true }
  )
    .then((voyage) => {
      if (!voyage) {
        return res.status(404).send({
          message: "voyage not found with id " + req.params.voyageId,
        });
      }
      res.send(voyage);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "voyage not found with id " + req.params.voyageId,
        });
      }
      return res.status(500).send({
        message: "Error updating voyage with id " + req.params.voyageId,
      });
    });
};

// Delete a voyage with the specified voyageId in the request
exports.delete = (req, res) => {
  Voyage.findByIdAndRemove(req.params.voyageId)
    .then((voyage) => {
      if (!voyage) {
        return res.status(404).send({
          message: "voyage not found with id " + req.params.voyageId,
        });
      }
      res.send({ message: "voyage deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "voyage not found with id " + req.params.voyageId,
        });
      }
      return res.status(500).send({
        message: "Could not delete voyage with id " + req.params.voyageId,
      });
    });
};
