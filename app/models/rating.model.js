const mongoose = require("mongoose");

const RatingSchema = mongoose.Schema(
    {
        userId: String,
        conducteurId: String,
        rating: Number,
      },
      {
        timestamps: true,
      }
);
module.exports = mongoose.model("Rating", RatingSchema);
