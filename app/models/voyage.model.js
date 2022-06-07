const mongoose = require("mongoose");

const VoyageSchema = mongoose.Schema(
  {
    conducteurId: String,
    mat: String,
    depart: String,
    fin: String,
    nom: String,
    marque: String,
    nbdeplace: String,
    datec: String,
    heure: String,
    bags: String,
    features: String,
    prixvoyage: String,
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
