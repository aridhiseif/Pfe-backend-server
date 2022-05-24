module.exports = (app) => {
    const comments = require("../controllers/comment.controller.js");
  
    app.post("/comments", comments.create);
  
    app.get("/comments", comments.findAll);
  
    app.get("/comments/:CommentId", comments.findOne);
  
    app.put("/comments/:CommentId", comments.update);
  
    app.delete("/comments/:CommentId", comments.delete);
  };
  