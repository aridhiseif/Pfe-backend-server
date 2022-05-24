const Comment = require("../models/comment.model.js");

// Create and Save a new comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    return res.status(400).send({
      message: "comment content can not be empty",
    });
  }

  // Create a comment
  const comment = new Comment({
    userId: req.body.userId,
    voyageId: req.body.voyageId,
    comment: req.body.comment,
  });

  // Save comment in the database
  comment
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating this comment.",
      });
    });
};

// Retrieve and return all comment from the database.
exports.findAll = (req, res) => {
  Comment.find()
    .then((Comments) => {
      res.send(Comments);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments.",
      });
    });
};

// Find a single comment with a commentId
exports.findOne = (req, res) => {
  Comment.findById(req.params.CommentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).send({
          message: "comment not found with id " + req.params.CommentId,
        });
      }
      res.send(comment);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "comment not found with id " + req.params.CommentId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving comment with id " + req.params.CommentId,
      });
    });
};

// Update a comment identified by the commentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.userId && !req.body.voyageId) {
    return res.status(400).send({
      message: "comment content can not be empty",
    });
  }

  // Find comment and update it with the request body
  Comment.findByIdAndUpdate(
    req.params.CommentId,
    {
      userId: req.body.userId,
      voyageId: req.body.voyageId,
      comment: req.body.comment,
    },
    { new: true }
  )
    .then((Comment) => {
      if (!Comment) {
        return res.status(404).send({
          message: "comment not found with id " + req.params.CommentId,
        });
      }
      res.send(Comment);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "comment not found with id " + req.params.CommentId,
        });
      }
      return res.status(500).send({
        message: "Error updating comment with id " + req.params.CommentId,
      });
    });
};

// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
  Comment.findByIdAndRemove(req.params.CommentId)
    .then((Comment) => {
      if (!Comment) {
        return res.status(404).send({
          message: "comment not found with id " + req.params.CommentId,
        });
      }
      res.send({ message: "comment deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "comment not found with id " + req.params.CommentId,
        });
      }
      return res.status(500).send({
        message: "Could not delete comment with id " + req.params.CommentId,
      });
    });
};
