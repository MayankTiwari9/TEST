import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expense: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      const newExpense = action.payload.data;
      state.expense = [...state.expense, newExpense];
    },

    setExpense(state, action) {
      const fetchedExpense = action.payload.data;
      state.expense = fetchedExpense;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;

