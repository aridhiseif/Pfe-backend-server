module.exports = (app) => {
  const voyages = require("../controllers/voyage.controller.js");

  app.post("/voyages", voyages.create);

  app.get("/voyages", voyages.findAll);

  app.get("/voyages/:voyageId", voyages.findOne);

  app.put("/voyages/:voyageId", voyages.update);

  app.delete("/voyages/:voyageId", voyages.delete);
};
