const users = require("../model/users");
const {
  encryptPassword,
  statuses,
  statusMessages,
  generateJWT,
} = require("../utils/authUtil");

const signupController = async (req, res) => {
  try {
    const encryptedpassword = await encryptPassword(req.body.password);
    const userModel = new users({
      email: req.body.email,
      name: req.body.name,
      password: encryptedpassword,
    });

    const newUser = await userModel.save();

    const { name, email } = newUser;

    console.log("User signed up successfully");

    res.status(statuses.CREATED).json({
      message: "New user created successfully",
      data: { name, email },
      status: statusMessages[statuses.CREATED],
    });
  } catch (error) {
    console.log("An Error occured while signing up =>" + error.message);
    res
      .status(statuses.INTERNAL_SERVER_ERROR)
      .json({ error: "Cannot create user", message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const token = generateJWT(req.user.email);

    res.status(statuses.OK).json({
      message: "User authenticated successfully",
      data: { token, email: req.user.email },
      status: statusMessages[statuses.OK],
    });
  } catch (error) {
    console.log("An Error occured while logging in =>" + error.message);
    res
      .status(statuses.INTERNAL_SERVER_ERROR)
      .json({ error: "Cannot login user", message: error.message });
  }
};

const getUserDetailsController = (req, res) => {
  res.status(statuses.OK).json({
    message: "User found successfully",
    data: req.user,
    status: statusMessages[statuses.OK],
  });
};

module.exports = {
  signupController,
  loginController,
  getUserDetailsController,
};
