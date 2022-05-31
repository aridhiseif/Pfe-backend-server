const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
    },

    lastname: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      unique: [true, "The email is unique"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    status: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
