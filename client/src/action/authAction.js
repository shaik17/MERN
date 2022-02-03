import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";
import setAuthtoken from "../utility/setAuthtoken";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Notiflix from "notiflix";
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch(
      (err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        }),
      
    );
};  
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      Notiflix.Notify.success("Login Successfully");
      // get token
      const { token } = res.data;

      // save to local storage

      localStorage.setItem("jwttoken", token);

      setAuthtoken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwttoken");
  setAuthtoken(false);
  dispatch(setCurrentUser({}));
};
