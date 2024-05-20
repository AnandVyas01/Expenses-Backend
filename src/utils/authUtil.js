const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const statuses = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROS: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const statusMessages = {
  [statuses.OK]: "OK",
  [statuses.CREATED]: "Created",
  [statuses.BAD_REQUEST]: "Bad Request",
  [statuses.UNAUTHORIZED]: "Unauthorized",
  [statuses.FORBIDDEN]: "Forbidden",
  [statuses.NOT_FOUND]: "Not Found",
  [statuses.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [statuses.VALIDATION_ERROS]: "Validation error",
};

function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidEmail(value) {
  return value && value.includes("@");
}

function isValidPassword(value) {
  return value && value.length >= 6;
}

async function encryptPassword(password) {
  return bcrypt.hash(password, Number(process.env.SALTROUNDS));
}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

function generateJWT(email) {
  //creating a json token that expires in one hour based on user email
  return jwt.sign({ email }, process.env.SECERETKEY, { expiresIn: "1h" });
}

function compareTOKEN(token) {
  return jwt.verify(token, process.env.SECERETKEY);
}

module.exports = {
  isValidText,
  isValidEmail,
  encryptPassword,
  statuses,
  statusMessages,
  isValidPassword,
  comparePassword,
  generateJWT,
  compareTOKEN,
};
