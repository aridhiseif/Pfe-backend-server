const mongoose = require("mongoose");

const CovsSchema = mongoose.Schema(
  {
    clientId: String,
    voyageId: String,
    conducteurId: String,
    nomClient: String,
    etat: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Covs", CovsSchema);
