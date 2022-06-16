const Contact = require("../models/contact.model");

// Create and Save a new contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    return res.status(400).send({
      message: "contact content can not be empty",
    });
  }

  // Create a contact
  const contact = new Contact({
    userId: req.body.userId,
    email: req.body.email,
    sujet: req.body.sujet,
    msg: req.body.msg,
  });

  // Save contact in the database
  contact
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating this contact.",
      });
    });
};

// Retrieve and return all contact from the database.
exports.findAll = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.send(contacts);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts.",
      });
    });
};

// Find a single contact with a contactId
exports.findOne = (req, res) => {
  Contact.findById(req.params.contactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId,
        });
      }
      res.send(contact);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving contact with id " + req.params.contactId,
      });
    });
};

// Update a contact identified by the contactId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.userId && !req.body.consucteurId) {
    return res.status(400).send({
      message: "contact content can not be empty",
    });
  }

  // Find contact and update it with the request body
  Contact.findByIdAndUpdate(
    req.params.contactId,
    {
      userId: req.body.userId,
      email: req.body.email,
      sujet: req.body.sujet,
      msg: req.body.msg,
    },
    { new: true }
  )
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId,
        });
      }
      res.send(contact);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Error updating contact with id " + req.params.contactId,
      });
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
  Contact.findByIdAndRemove(req.params.contactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId,
        });
      }
      res.send({ message: "contact deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Could not delete contact with id " + req.params.contactId,
      });
    });
};
