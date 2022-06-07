module.exports = (app) => {
  const covs = require("../controllers/covs.controller");

  app.post("/covs", covs.create);

  app.get("/covs", covs.findAll);

  app.get("/covs/:covsId", covs.findOne);

  app.put("/covs/:covsId", covs.update);

  app.delete("/covs/:covsId", covs.delete);
};
