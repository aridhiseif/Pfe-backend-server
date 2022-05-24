const mongoose = require("mongoose");

const ReclamationSchema = mongoose.Schema(
  {
    userId: String,
    conducteurId: String,
    reclamation: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reclamation", ReclamationSchema);
