import axios from "axios";
import { toast } from "react-toastify";
import {
  ALL_USER_LOAD_FAIL,
  ALL_USER_LOAD_REQUEST,
  ALL_USER_LOAD_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";

export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post("/api/signin", user);

    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    toast.success("Logado com sucesso!");
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const { data } = await axios.post("/api/signup", user);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    toast.success("Cadatrado com sucesso!");
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

//log out action
export const userLogoutAction = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    localStorage.removeItem("userInfo");
    const { data } = await axios.get("/api/logout");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    toast.success("Log out com sucesso!");
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error?.response?.data.error,
    });
    toast.error(error?.response?.data.error);
  }
};

//user profile action
export const userProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_LOAD_REQUEST });
  try {
    const { data } = await axios.get("/api/me");
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload: error?.response?.data?.error,
    });
  }
};

//all user action
export const allUserAction = () => async (dispatch) => {
  dispatch({ type: ALL_USER_LOAD_REQUEST });
  try {
    const { data } = await axios.get("/api/allusers");
    dispatch({
      type: ALL_USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USER_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};


//delete user
export const adminDeleteAction = (id) => async (dispatch) => {
  dispatch({ type: USER_DELETE_REQUEST })

  try {
    const { data } = await axios.delete(`/api/admin/user/delete/${id}`);
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data
    });

    toast.success(data?.message);

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.error
    });
    toast.error(error.response.data.error);
  }
}