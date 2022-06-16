const Covs = require("../models/covs.model");

// Create and Save a new covs
exports.create = (req, res) => {
  // Validate request

  // Create a covs
  const covs = new Covs({
    clientId: req.body.clientId,
    voyageId: req.body.voyageId,
    conducteurId: req.body.conducteurId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    etat: req.body.etat,
  });

  // Save covs in the database
  covs
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating this covs.",
      });
    });
};

// Retrieve and return all covs from the database.
exports.findAll = (req, res) => {
  Covs.find()
    .then((covss) => {
      res.send(covss);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving covss.",
      });
    });
};

//delete bu conducteurId
exports.deleteByConducteurId = (req, res) => {
  Covs.deleteMany(
    { conducteurId: req.params.conducteurId },
    function (err, resultat) {
      if (err) {
        res.send(err);
      } else {
        res.send(resultat);
      }
    }
  );
};

// Find a single covs with a covsId
exports.findOne = (req, res) => {
  Covs.findById(req.params.covsId)
    .then((covs) => {
      if (!covs) {
        return res.status(404).send({
          message: "covs not found with id " + req.params.covsId,
        });
      }
      res.send(covs);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "covs not found with id " + req.params.covsId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving covs with id " + req.params.covsId,
      });
    });
};

// Update a covs identified by the covsId in the request
exports.update = (req, res) => {
  // Validate Request

  // Find covs and update it with the request body
  Covs.findByIdAndUpdate(
    req.params.covsId,
    {
      etat: req.body.etat,
    },
    { new: true }
  )
    .then((covs) => {
      if (!covs) {
        return res.status(404).send({
          message: "covs not found with id " + req.params.covsId,
        });
      }
      res.send(covs);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "covs not found with id " + req.params.covsId,
        });
      }
      return res.status(500).send({
        message: "Error updating covs with id " + req.params.covsId,
      });
    });
};

// Delete a covs with the specified covsId in the request
exports.delete = (req, res) => {
  Covs.findByIdAndRemove(req.params.covsId)
    .then((covs) => {
      if (!covs) {
        return res.status(404).send({
          message: "covs not found with id " + req.params.covsId,
        });
      }
      res.send({ message: "covs deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "covs not found with id " + req.params.covsId,
        });
      }
      return res.status(500).send({
        message: "Could not delete covs with id " + req.params.covsId,
      });
    });
};
