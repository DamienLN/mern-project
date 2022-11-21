const UserModel = require('../models/user.models');
const UsrModel = require('../models/user.models');
const ObjectId = require('mongoose').Types.ObjectId;

// info de tout les users
module.exports.getAllUsers = async (req, res) => {
    // -password enleve le mdp quand on request les donnees user
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}