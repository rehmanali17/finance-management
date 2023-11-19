import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../environment/environment";

let user = null
if(localStorage.getItem("user")){
  user = JSON.parse(localStorage.getItem("user"))
}
const accessToken = localStorage.getItem("accessToken") || "";

// Slice
const slice = createSlice({
  name: "auth",
  initialState: {
    user,
    accessToken,
    requestError: {
      isError: false,
      message: "",
    },
    successMessage: "",
    inProgress: false,
  },
  reducers: {
    requestInitiated: (state) => {
      state.inProgress = true;
      state.successMessage = "";
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("user", JSON.stringify(state.user))
      localStorage.setItem("accessToken", state.accessToken)
      state.requestError = {
        isError: false,
        message: "",
      };
      state.inProgress = false;
      state.successMessage = "";
    },
    loginFailed: (state, action) => {
      state.user = null;
      state.accessToken = "";
      state.requestError = action.payload;
      state.inProgress = false;
      state.successMessage = "";
    },
    signupSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.requestError = {
        isError: false,
        message: "",
      };
      state.inProgress = false;
      state.successMessage = "";
    },
    signupFailed: (state, action) => {
      state.user = null;
      state.accessToken = "";
      state.requestError = action.payload;
      state.inProgress = false;
      state.successMessage = "";
    },
    updateProfileSuccess: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
      state.requestError = {
        isError: false,
        message: "",
      };
      state.inProgress = false;
    },
    updateTransactionBalance: (state, action) => {
      state.user.balance = state.user.balance - action.payload.amount;
      localStorage.setItem("user", JSON.stringify(state.user))
      state.successMessage = action.payload.message;
      state.inProgress = false;
    },
    updateProfileFailed: (state, action) => {
      state.requestError = action.payload;
      state.inProgress = false;
      state.successMessage = "";
    },
    clearSuccessMessage: (state) => {
      state.successMessage = "";
      state.inProgress = false;
    },
    logout: state => {
      localStorage.clear()
      return {
        ...state,
        user: null,
        requestError: {
          isError: false,
          message: "",
        },
        inProgress: false,
        successMessage: ""
      };
    },
  },
});

export default slice.reducer;

// Actions
const {
  requestInitiated,
  loginSuccess,
  loginFailed,
  signupSuccess,
  signupFailed,
  updateProfileSuccess,
  updateTransactionBalance,
  updateProfileFailed,
  clearSuccessMessage,
  logout,
} = slice.actions;

export const login = values => async dispatch => {
  try {
    dispatch(requestInitiated());
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: values.email,
      password: values.password,
    });
    dispatch(loginSuccess({ user: response.data.user, accessToken: response.data.accessToken }));
  } catch (error) {
    dispatch(loginFailed({ isError: true, message: error.response.data.message }));
  }
};

export const signup = values => async dispatch => {
  try {
    dispatch(requestInitiated());
    const response = await axios.post(`${API_URL}/api/auth/signup`, values);
    dispatch(signupSuccess({ user: response.data.user, accessToken: response.data.accessToken }));
  } catch (error) {
    dispatch(signupFailed({ isError: true, message: error.response.data.message }));
  }
};

export const updateProfile = (values, user, accessToken) => async dispatch => {
  try {
    dispatch(requestInitiated());
    const response = await axios.put(`${API_URL}/api/user/${user._id}`, {
      name: values.name,
      username: values.username,
      address: values.address,
      mobile_number: values.mobile_number,
      password: values.password,
      email: user.email
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    dispatch(updateProfileSuccess(response.data));
    setTimeout(()=>{
      dispatch(clearSuccessMessage());
    }, 5000)
  } catch (error) {
    dispatch(updateProfileFailed({ isError: true, message: error.response.data.message }));
  }
};

export const updateBalance = (values, method, userId, accessToken) => async dispatch => {
  try {
    dispatch(requestInitiated());
    const response = await axios.patch(`${API_URL}/api/user/balance/${user._id}`, {
      amount: values.amount,
      method
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    dispatch(updateProfileSuccess(response.data));
    setTimeout(()=>{
      dispatch(clearSuccessMessage());
    }, 5000)
  } catch (error) {
    dispatch(updateProfileFailed({ isError: true, message: error.response.data.message }));
  }
};

export const transferBalance = (values, userId, accessToken) => async dispatch => {
  try {
    dispatch(requestInitiated());
    const response = await axios.patch(`${API_URL}/api/user/transfer/${user._id}`, {
      amount: values.amount,
      userId: values.user
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    dispatch(updateTransactionBalance({ amount: values.amount, message: response.data.message || 'Balance transferred successfully'}));
    setTimeout(()=>{
      dispatch(clearSuccessMessage());
    }, 5000)
  } catch (error) {
    dispatch(updateProfileFailed({ isError: true, message: error.response.data.message }));
  }
};

export const logoutInitiated = () => async dispatch => {
  dispatch(logout());
};
