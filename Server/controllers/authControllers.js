const schemas = require("../schemas/usersSchema");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// -------------------------------------------------------------
//  REGISTER USER
// -------------------------------------------------------------

const register = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.createNewUser.validate(req.body);
  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }

  try {
    // check if the email is already in use (in database)
    const existingUser = await User.find({ email: value.email });

    // if this email is in use- send an error response
    if (existingUser.length > 0)
      return res.status(409).json({
        success: false,
        message: `Email ${value.email} is already in use! consider logging in`,
      });
    // create new user in memory
    const newUser = new User(value);
    // hash the password
    const hashedPassword = await bcrypt.hash(value.password, 10);
    newUser.password = hashedPassword;
    newUser.isAdmin = false;
    // save the new user to the database
    const saved = await newUser.save();
    const token = jwt.sign(
      {
        _id: saved.id,
        isAdmin: saved.isAdmin,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    // success! send the response with token
    return res
      .status(201)
      .json({ success: true, created: newUser, token: token });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error registering user: ${err.message}`,
    });
  }
};

// -------------------------------------------------------------
//  LOGIN USER
// -------------------------------------------------------------

const login = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.login.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }

  try {
    const user = await User.findOne({ email: value.email });
    // user not found
    if (!user)
      return res
        .status(403)
        .json({ sucees: false, message: "Invalid credintials" });
    // user found
    // check if password match
    const isMatch = await bcrypt.compare(value.password, user.password);
    // no match
    if (!isMatch)
      return res
        .status(403)
        .json({ sucees: false, message: "Invalid credintials" });
    // match
    // create a new token
    const token = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );
    // success ! send response + token
    return res.status(200).json({ success: true, token: token });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Error loggin-in: ${err.message}` });
  }
};

// -------------------------------------------------------------
//  USER PROFILE
// -------------------------------------------------------------

const myProfile = async (req, res) => {
  try {
    console.log(chalk.blue.bold("req.user.id=", req.user.id));
    const userProfile = await User.findById(req.user.id).select(
      "-_id -password"
    );
    return res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// -------------------------------------------------------------
//  MUST LOGIN FUNCTION
// -------------------------------------------------------------

const mustLogin = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(403)
      .json({
        sucees: false,
        message: "Forbidden: you must be logged-in to view this content",
      });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res
      .status(403)
      .json({ sucees: false, message: "Forbidden: invalid token" });
  }
};

// -------------------------------------------------------------
//  ALLOWED ROLES
// -------------------------------------------------------------

const allowedRoles = (allowedRoles) => {
  return async (req, res, next) => {
    // check if allowedRoles is an array
    if (!Array.isArray(allowedRoles))
      throw new Error("Error: allowedRoles must be an array");
    // check if allowedRoles has at-least one element
    if (allowedRoles.length === 0)
      throw new Error("Error: allowedRoles must contain at-least one element");
    // double-check that the user is actually logged-in
    if (!req.user)
      return res
        .status(403)
        .json({
          sucees: false,
          message: "Forbidden: you must be logged-in to view this content",
        });
    // simple destructuring
    const { isAdmin, _id } = req.user;

    // checking if our user has one of the roles from allowedRoles
    let hasRole = false;

    // check agains allowedRoles
    if (allowedRoles.includes("admin") && isAdmin) hasRole = true;
    if (allowedRoles.includes("registedUser") && _id === req.params.id)
      hasRole = true;
    if (allowedRoles.includes("loggedIn")) hasRole = true;
    if (allowedRoles.includes("isLiked")) hasRole = true;

    // user does not meet the required roles
    if (!hasRole) {
      const allowedRolesString = allowedRoles.join("/");
      return res
        .status(401)
        .json({
          success: false,
          message: `Unauthorized: only ${allowedRolesString} users can access this resource`,
        });
    }

    // allowed !
    return next();
  };
};

module.exports = {
  register,
  login,
  myProfile,
  mustLogin,
  allowedRoles,
};
