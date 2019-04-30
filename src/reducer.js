import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from "./actions";

function user(state = { isAuthenticated: false }, action) {
    switch (action.type) {
      case USER_LOGGED_IN:
        return {
          ...state,
          isAuthenticated: action.payload.isAuthenticated
        };
      case USER_LOGGED_OUT:
        return {
          ...state,
          isAuthenticated: action.payload.isAuthenticated
        };
      default:
        return state;
    }
  }

  export default user;