import { UPDATE_USER } from "../actions/userActions.js";

const initialState = {
    uid: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };
  
  export const userReducer = (state=initialState, action) => {
    switch (action.type) {
      case UPDATE_USER:
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };
  