const expensesModel = require("../model/expenses");

const createExpense = async (req, res, next) => {
  try {
    const expenses = new expensesModel(req.body);
    // await expenses.save();
    res.status(201).json({ message: "Expense Added", data: req.body });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense };
