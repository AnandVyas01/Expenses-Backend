const express = require("express");
const { checkAuthMiddleWare, expenseCreateFieldsCheck, checkuserIdMissing } = require("../middlewares/expensesMiddleWare");
const { createExpense, listExpense } = require("../controllers/expenseController");

const router = express.Router();

router.use(checkAuthMiddleWare); //common middleware checkong auth token for all routes.

router.post("/create", expenseCreateFieldsCheck, createExpense);
router.get("/list/:userId", checkuserIdMissing, listExpense)

module.exports = router;
