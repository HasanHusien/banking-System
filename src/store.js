import { configureStore } from "@reduxjs/toolkit";
import reducerAccount from "./features/accounts/accountSlice";
import reducerCustomer from "./features/customers/customerSlice";

// using redux toolkit the best way and easiest
const store = configureStore({
  reducer: {
    account: reducerAccount,
    customer: reducerCustomer,
  },
});
export default store;
