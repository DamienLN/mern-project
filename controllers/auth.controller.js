const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    // 3 day, and 24 * 60 * 60 * 1000 = 1 day
    expireIn: 3 * 24 * 60 * 60 * 1000
  })
}

// Inscription
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await userModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).json({ err });
  }
};

// Connection
module.exports.signIn = async (req, res) => {
  // for signIn = req.body.email etc..
  const { email, password} = req.body

  try{
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    // jwt is the name of the cookie, + the token, and http for the security of our token
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
    res.status(200).json({user: user._id})
  } catch (err) {
    res.status(200).json(err)

  }
};

// Disconnection
module.exports.logout = (req, res) => {
  // maxAge 1ms so he dissapeared fast
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/');
}