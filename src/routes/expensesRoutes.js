const express = require("express");
const { checkAuthMiddleWare, expenseCreateFieldsCheck, checkuserIdMissing, expenseUpdateFieldCheck, expenseDeleteCheck } = require("../middlewares/expensesMiddleWare");
const { createExpense, listExpense, updateExpense, deleteExpense } = require("../controllers/expenseController");

const router = express.Router();

router.use(checkAuthMiddleWare); //common middleware checkong auth token for all routes.

router.post("/create", expenseCreateFieldsCheck, createExpense);
router.get("/list/:userId", checkuserIdMissing, listExpense);
router.patch("/update/:expenseId", expenseUpdateFieldCheck, updateExpense);
router.delete("/delete/:expenseId", expenseDeleteCheck, deleteExpense);

module.exports = router;
