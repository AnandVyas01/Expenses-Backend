const express = require("express");
const { checkAuthMiddleWare } = require("../middlewares/expensesMiddleWare");
const { createExpense } = require("../controllers/expenseController");

const router = express.Router();

router.use(checkAuthMiddleWare); //common middleware checkong auth token for all routes.

router.post("/create", createExpense);

module.exports = router;
