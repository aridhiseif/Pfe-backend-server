const mongoose = require("mongoose");

const RapportSchema = mongoose.Schema(
  {
    userId: String,
    conducteurId: String,
    rapport: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rapport", RapportSchema);
