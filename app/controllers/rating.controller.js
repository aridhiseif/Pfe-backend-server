// the rationg module
const Rating = require("../models/rating.model");

// Create and Save a new rating
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    return res.status(400).send({
      message: "rating content can not be empty",
    });
  }

  // Create a rating
  const rating = new Rating({
    userId: req.body.userId,
    conducteurId: req.body.conducteurId,
    rating: req.body.rating,
  });

  // Save rating in the database
  rating
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating this rating.",
      });
    });
};

// Retrieve and return all rating from the database.
exports.findAll = (req, res) => {
  Rating.find()
    .then((ratings) => {
      res.send(ratings);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ratings.",
      });
    });
};

// Find a single rating with a ratingId
exports.findOne = (req, res) => {
  Rating.findById(req.params.ratingId)
    .then((rating) => {
      if (!rating) {
        return res.status(404).send({
          message: "rating not found with id " + req.params.ratingId,
        });
      }
      res.send(rating);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "rating not found with id " + req.params.ratingId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving rating with id " + req.params.ratingId,
      });
    });
};

// Update a rating identified by the ratingId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.userId && !req.body.consucteurId) {
    return res.status(400).send({
      message: "rating content can not be empty",
    });
  }

  // Find rating and update it with the request body
  Rating.findByIdAndUpdate(
    req.params.ratingId,
    {
      userId: req.body.userId,
      voyageId: req.body.consucteurId,
      rating: req.body.rating,
    },
    { new: true }
  )
    .then((rating) => {
      if (!rating) {
        return res.status(404).send({
          message: "rating not found with id " + req.params.ratingId,
        });
      }
      res.send(rating);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "rating not found with id " + req.params.ratingId,
        });
      }
      return res.status(500).send({
        message: "Error updating rating with id " + req.params.ratingId,
      });
    });
};

// Delete a rating with the specified ratingId in the request
exports.delete = (req, res) => {
  Rating.findByIdAndRemove(req.params.ratingId)
    .then((rating) => {
      if (!rating) {
        return res.status(404).send({
          message: "rating not found with id " + req.params.ratingId,
        });
      }
      res.send({ message: "rating deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "rating not found with id " + req.params.ratingId,
        });
      }
      return res.status(500).send({
        message: "Could not delete rating with id " + req.params.ratingId,
      });
    });
};
