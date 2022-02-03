import React from "react";
import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from "./types";
import Notiflix from "notiflix";

export const getProfile = () => (dispatch) => {
  dispatch(loadingFunction());
  axios
    .get("/api/profile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

export const loadingFunction = () => {
  Notiflix.Loading.pulse("Loading...");
  Notiflix.Loading.remove();

  return {
    type: PROFILE_LOADING,
  };
};

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
  };
};

export const profileCreate = (newprofile, history) => (dispatch) => {
  axios
    .post("/api/profile", newprofile)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const DeleteProfile = () => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )

      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};
