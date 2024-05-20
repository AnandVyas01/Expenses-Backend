const mongoose = require("mongoose");

const expensesScehema = mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      required: true,
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

const expensesModel = mongoose.model("Expenses", expensesScehema, "expenses");

module.exports = expensesModel;
