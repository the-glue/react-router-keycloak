
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export function userLoggedIn() {
    const status = {
      isAuthenticated: true
    };
    return {
      type: USER_LOGGED_IN,
      payload: status
    };
  }
  
  export function userLoggedOut() {
    const status = {
      isAuthenticated: false
    };
    return {
      type: USER_LOGGED_OUT,
      payload: status
    };
  }
  