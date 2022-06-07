const mongoose = require("mongoose");

const ConducteurSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    etat: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conducteur", ConducteurSchema);
