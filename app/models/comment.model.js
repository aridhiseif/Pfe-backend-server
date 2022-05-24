const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    userId: String,
    voyageId:String,
    comment:String,
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
