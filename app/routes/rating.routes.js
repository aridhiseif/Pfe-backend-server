module.exports = (app) => {
    const ratings = require("../controllers/rating.controller");
  
    app.post("/ratings", ratings.create);
  
    app.get("/ratings", ratings.findAll);
  
    app.get("/ratings/:ratingId", ratings.findOne);
  
    app.put("/ratings/:ratingId", ratings.update);
  
    app.delete("/ratings/:ratingId", ratings.delete);
  };
  