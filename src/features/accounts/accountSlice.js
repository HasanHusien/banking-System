import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loan: 0,
  loanPurpose: "",
  balance: 0,
  isLoading: false,
};
/* 
with toolkit(createSlice)

  - can immutable state 
  - no write action creator 
  - reducer func been easy
*/
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = true;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

export const { requestLoan, withdraw, payLoan } = accountSlice.actions;

// classic thunks
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // for compiler new its a thunk
  return async function (dispatch, getSate) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
    console.log(data);
  };
}

export default accountSlice.reducer;
