const UserModel = require("../models/user.models");
const UsrModel = require("../models/user.models");
const ObjectId = require("mongoose").Types.ObjectId;

// info de tout les users
module.exports.getAllUsers = async (req, res) => {
  // -password enleve le mdp quand on request les donnees user
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// info d un seul user

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectId.isValid(req.params))
    return res.stauts(400).send("ID unknown: " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown" + err);
  });
};
