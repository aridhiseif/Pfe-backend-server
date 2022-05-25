module.exports = (app) => {
  const rapports = require("../controllers/rapport.controller");

  app.post("/rapports", rapports.create);

  app.get("/rapports", rapports.findAll);

  app.get("/rapports/:rapportId", rapports.findOne);

  app.put("/rapports/:rapportId", rapports.update);

  app.delete("/rapports/:rapportId", rapports.delete);
};
