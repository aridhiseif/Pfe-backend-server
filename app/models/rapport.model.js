const mongoose = require("mongoose");

const RapportSchema = mongoose.Schema(
  {
    userId: String,
    conducteurId: String,
    email:String,
    sujet:String,
    rapport: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rapport", RapportSchema);
