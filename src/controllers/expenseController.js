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
    const list = await expensesModel
      .find({ userId })
      .select("date description category amount _id")
      .sort({ date: -1 });
    res.status(201).json({ message: "Expense Added", data: list });
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const expense = await expensesModel
      .findOneAndUpdate({ _id: req.expenseId }, { ...req.body })
      .select("date description category amount");

    res.status(201).json({ message: "Expense updated", data: expense });
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const deletedExpense = await expensesModel.deleteOne({
      _id: req.expenseId,
    });
    res.status(201).json({ message: "Expense deleted", data: deletedExpense });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense, listExpense, updateExpense, deleteExpense };
