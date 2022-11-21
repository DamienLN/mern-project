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
  if (!ObjectId.isValid(req.params.id))
    return res.stauts(400).send("ID unknown: " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown" + err);
  }).select('-password');
};

// MAJ profil user

modules.exports.updateUser = async (req, res) => {
  // verification si l id est correct
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  // correct = on peut set la bio
  try {
    await UserModel.findOneAndUpdate(
        {_id: req.params.id},
        {
          $set: {
            bio: req.body.bio
          }
        },
        {new: true, upsert:true, setDefaultsOnInsert: true},
        (err,docs) => {
          // toute la docs (data)
          if (!err) return res.send(docs);
          // erreur
          if (err) return res.status(500).send({message: err});

        }
    )
  } catch (err){
    return res.status(500).json({message: err});
  }
}


