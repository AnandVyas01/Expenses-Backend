const { compareTOKEN, statuses } = require("../utils/authUtil");
const {
  isUserIdMissing,
  isAmountMissing,
  isCategoryMissing,
  isDateMissing,
  isUserIdMissingFromParams,
  isexpenseIdMissingFromParams,
} = require("../utils/expensesUtil");
const { NoAuth } = require("../utils/tokenVerificationError");

const checkAuthMiddleWare = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NoAuth("Not Authenticated.")); //this returns contorl to app.js.
  }
  const extractedToken = req.headers.authorization.split(" ");
  if (extractedToken.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER IS NOT IN CORRECT FORMAT.");
    return next(new NoAuth("Not Authenticated."));
  }
  try {
    const isTokenValidated = compareTOKEN(extractedToken[1]);
    req.token = isTokenValidated;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new NoAuth("Not authenticated."));
  }
  next();
};

const expenseCreateFieldsCheck = (req, res, next) => {
  try {
    if (!req.body) {
      throw new Error("BODY is missing from request.");
    }

    if (isUserIdMissing(req)) {
      throw new Error("USER is missing from request.");
    }

    if (isAmountMissing(req)) {
      throw new Error("AMOUNT is missing from request.");
    }

    if (isCategoryMissing(req)) {
      throw new Error("CATEGORY is missing from request.");
    }

    if (isDateMissing(req)) {
      throw new Error("DATE is missing from request.");
    }

    next();
  } catch (error) {
    res.status(statuses.VALIDATION_ERROS).json({
      error: error.message,
      message: statusMessages[statuses.VALIDATION_ERROS],
    });
  }
};

const expenseUpdateFieldCheck = (req, res, next) => {
  try {
    if (!req.body) {
      throw new Error("BODY is missing from request.");
    }

    if (isUserIdMissing(req)) {
      throw new Error("USER is missing from request.");
    }

    if (isAmountMissing(req)) {
      throw new Error("AMOUNT is missing from request.");
    }

    if (isCategoryMissing(req)) {
      throw new Error("CATEGORY is missing from request.");
    }

    if (isDateMissing(req)) {
      throw new Error("DATE is missing from request.");
    }
    
    if (isexpenseIdMissingFromParams(req)) {
      throw new Error("Expense Id is missing from request.");
    }

    req.expenseId = req.params.expenseId;

    next();
  } catch (error) {
    res.status(statuses.VALIDATION_ERROS).json({
      error: error.message,
      message: statusMessages[statuses.VALIDATION_ERROS],
    });
  }
};

const expenseDeleteCheck = (req, res, next) => {
  try {
    if (isexpenseIdMissingFromParams(req)) {
      throw new Error("Expense Id is missing from request.");
    }

    req.expenseId = req.params.expenseId;

    next();
  } catch (error) {
    res.status(statuses.VALIDATION_ERROS).json({
      error: error.message,
      message: statusMessages[statuses.VALIDATION_ERROS],
    });
  }
};

const checkuserIdMissing = (req, res, next) => {
  try {
    if (isUserIdMissingFromParams(req)) {
      throw new Error("user id is missing from request.");
    }

    req.body.userId = req.params.userId;
    next();
  } catch (error) {
    res.status(statuses.VALIDATION_ERROS).json({
      error: error.message,
      message: statusMessages[statuses.VALIDATION_ERROS],
    });
  }
};

module.exports = {
  checkAuthMiddleWare,
  expenseCreateFieldsCheck,
  checkuserIdMissing,
  expenseUpdateFieldCheck,
  expenseDeleteCheck
};
