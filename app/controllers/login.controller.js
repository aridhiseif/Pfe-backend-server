const Admin = require("../models/admin.model.js");

exports.findbycredantials = (req, res) => {
  Admin.find({
    email: req.body.email,
    password: req.body.password,
  }).then((admin) => {
    if (!admin) {
      res.send("email or password is incorrect");
    } else {
      res.send(admin);
    }
  });
};
