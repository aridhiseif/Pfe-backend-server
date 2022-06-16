const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    userId: String,
    email: String,
    sujet: String,
    msg: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
