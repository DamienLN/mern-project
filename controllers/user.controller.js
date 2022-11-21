const UserModel = require("../models/user.models");
const UserModel = require("../models/user.models");
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
  }).select("-password");
};

// MAJ profil user
modules.exports.updateUser = async (req, res) => {
  // verifie id
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  // correct = on peut set la bio
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        // toute la docs (data)
        if (!err) return res.send(docs);
        // erreur
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// delete
module.exports.deleteUser = async (req, res) => {
  // verfie id
  if (!ObjectId.isValid(req.params.id))
    return res.stauts(400).send("ID unknown : " + req.params.id);
  // delete cette partie
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// follow
module.exports.follow = async (req, res) => {
  // verfie id and body
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  )
    return res.stauts(400).send("ID unknown : " + req.params.id);

  try {
    // add to follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      // idToFollow is the person we want to follow, it his id ($addToSet to add )
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.stauts(201).json(docs);
        else return res.status(400).json(err);
      }
    );

    //  add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        //  cant do 2 res.status
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// unfollow
module.exports.unfollow = async (req, res) => {
  // verfie id
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnfollow)
  )
    return res.stauts(400).send("ID unknown : " + req.params.id);

  try {
    // remove to follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      // idToFollow is the person we want to follow, it his id ($pull to remove)
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.stauts(201).json(docs);
        else return res.status(400).json(err);
      }
    );

    //  remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        //  cant do 2 res.status
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
