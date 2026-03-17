/* 
with classicRedux

  - syntax like useReducer hook (readable)
  - can set any arguments 
*/
const initialState = {
  loan: 0,
  loanPurpose: "",
  balance: 0,
  isLoading: false,
};

export default function reducerAccount(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: action.payload.amount + state.balance,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return state; // no (throw new error) with redux => base case
  }
}
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

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}

/*
make action manually, without made a func for each one.
func for each action is optional.

 store.dispatch({ type: "account/deposit", payload: 500 });

 store.dispatch({ type: "account/withdraw", payload: 200 });

 store.dispatch({
   type: "account/requestLoan",
   payload: { purpose: "buy a car", amount: 1000 },
 });

 store.dispatch({ type: "account/payLoan" });

 console.log(store.getState());
*/
