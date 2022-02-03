import React from "react";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE } from "../action/types";

const initialstate = {
  loading: false,
  Profile: null,
  Profiles: null,
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        Profile: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        Profile: null,
      };

    default:
      return state;
  }
}
