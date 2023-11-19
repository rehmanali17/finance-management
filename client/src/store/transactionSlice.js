import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../environment/environment";

// Slice
const slice = createSlice({
    name: "transaction",
    initialState: {
        transactions: [],
        requestError: {
            isError: false,
            message: "",
        },
        inProgress: false,
    },
    reducers: {
        requestInitiated: state => ({ ...state, inProgress: true }),
        fetchSuccess: (state, action) => ({
            ...state,
            transactions: action.payload,
            requestError: {
                isError: false,
                message: "",
            },
            inProgress: false,
        }),
        fetchError: (state, action) => ({
            ...state,
            transactions: [],
            requestError: action.payload,
            inProgress: false,
        }),
    },
});

export default slice.reducer;

// Actions
const {
    requestInitiated,
    fetchSuccess,
    fetchError,
} = slice.actions;

export const fetchTransactions = (userId, accessToken) => async dispatch => {
    try {
        dispatch(requestInitiated());
        const response = await axios.get(`${API_URL}/api/user/transaction/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(fetchSuccess(response.data.transactions));
    } catch (error) {
        dispatch(fetchError({ isError: true, message: error.response.data.message }));
    }
};
