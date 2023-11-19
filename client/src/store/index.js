import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "store/authSlice";
import transaction from "./transactionSlice";

const reducer = combineReducers({
    auth,
    transaction,
});

const store = configureStore(
    {
        reducer,
    },
    composeWithDevTools()
);

export default store;
