const expensesModel = require("../model/expenses");

const createExpense = async (req, res, next) => {
  try {
    req.body.date = new Date(req.body.date);
    const expenses = new expensesModel(req.body);
    await expenses.save();
    res.status(201).json({ message: "Expense Added", data: req.body });
  } catch (error) {
    next(error);
  }
};

const listExpense = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const list = await expensesModel.find({ userId }).select("date description category amount _id");
    res.status(201).json({ message: "Expense Added", data: list });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense, listExpense };
