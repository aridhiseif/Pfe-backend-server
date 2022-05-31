const mongoose = require("mongoose");

const VoyageSchema = mongoose.Schema(
  {
    conducteurId: String,
    start: String,
    destination: String,
    voiture: String,
    date: String,
    heure: String,
    prix: String,
    description: String,
    archive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Voyage", VoyageSchema);
