const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const users = require("../model/users");
const {
  statuses,
  statusMessages,
  isValidText,
  isValidEmail,
  isValidPassword,
  comparePassword,
} = require("../utils/authUtil");

const signUpMiddleware = async (req, res, next) => {
  try {
    const name = isValidText(req.body.name);
    const email = isValidEmail(req.body.email);
    const password = isValidPassword(req.body.password);
    if (!name || !email || !password) {
      throw new Error("Please check your details and try again");
    }
    const existingUser = await users.findOne({ email: req.body.email });
    if (existingUser) {
      throw new Error("This user already exists, please login to continue");
    }
    next();
  } catch (error) {
    res.status(statuses.BAD_REQUEST).json({
      error: error.message,
      message: statusMessages[statuses.BAD_REQUEST],
    });
  }
};

const loginMiddleware = async (req, res, next) => {
  try {
    const email = isValidEmail(req.body.email);
    const password = isValidPassword(req.body.password);
    if (!email || !password) {
      throw new Error("Please enter valid credentials");
    }
    const existingUser = await users.findOne({ email: req.body.email });
    if (!existingUser) {
      throw new Error(
        "Seems like you have not signed up yet, sign up to continue."
      );
    }

    const isValidPasswordCheck = await comparePassword(
      req.body.password,
      existingUser.password
    );

    if (!isValidPasswordCheck) {
      res.status(statuses.UNAUTHORIZED).json({
        error: "Check your password and try again.",
        message: statusMessages[statuses.UNAUTHORIZED],
      });
    }

    req.user = existingUser;
    next();
  } catch (error) {
    res.status(statuses.BAD_REQUEST).json({
      error: error.message,
      message: statusMessages[statuses.BAD_REQUEST],
    });
  }
};

const getUserDetailsMiddleware = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      throw new Error("User email is required.");
    }
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      throw new Error("User not found.");
    }

    req.user = existingUser;
    next();
  } catch (error) {
    res.status(statuses.BAD_REQUEST).json({
      error: error.message,
      message: statusMessages[statuses.BAD_REQUEST],
    });
  }
};

module.exports = { signUpMiddleware, loginMiddleware, getUserDetailsMiddleware };
