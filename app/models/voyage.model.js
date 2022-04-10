const mongoose = require("mongoose");

const VoyageSchema = mongoose.Schema(
  {
    conducteurId: String,
    start: String,
    destination: String,
    date: String,
    heure: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Voyage", VoyageSchema);
