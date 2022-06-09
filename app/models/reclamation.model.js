const mongoose = require("mongoose");

const ReclamationSchema = mongoose.Schema(
  {
    userId: String,
    voyageId: String,
    email: String,
    sujet: String,
    reclamation: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reclamation", ReclamationSchema);
