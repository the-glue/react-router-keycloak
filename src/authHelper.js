import Keycloak from "keycloak-js";
import { connect } from "react-redux";

// Setup client

const KEYCLOACK_URL = process.env.REACT_APP_KEYCLOAK_URL;
const REALM = process.env.REACT_APP_PARAMETER_REALM;
const CLIENT_ID = process.env.REACT_APP_PARAMETER_CLIENT_ID;

const keycloak = new Keycloak({
  url: `${KEYCLOACK_URL}/auth/`,
  realm: REALM,
  clientId: CLIENT_ID
});
/*const checkLogin = () => {
  console.log(keycloak)
  updateToken();
  return keycloak.authenticated;
};*/
/*const logIn = () => {
  console.log("logging in");
  if (!keycloak.isAuthenticated) {
    try {
      keycloak.init({ onLoad: "login-required", checkLoginIframe: false }).success(() => {
        console.log("successfully logged in");
        console.log(keycloak);
        //axios.defaults.headers.common.Authorization = `Bearer ${this.keycloak.token}`;
        //this.props.userLoggedIn();
      }).error((e) => {
      console.log("failed to log in");
    });
      console.log(keycloak);
    } catch (e) {
      console.log("failed to log in");
      console.log(e)
    }
  }
};*/
/*const updateToken = () => {
  keycloak.updateToken(30).success(refreshed => {
    if (refreshed) {
      axios.defaults.headers.common.Authorization = `Bearer ${keycloak.token}`;
    }
  });
};*/

/*const logOut = () => {
  axios.defaults.headers.common.Authorization = "";

  if (keycloak.authenticated) {
    keycloak.logout().success(() => {
      // TODO: seems this code is never called
    });
  }
};*/
/*const authHelper =  {
  keycloak: new Keycloak({
    url: `${KEYCLOACK_URL}/auth/`,
    realm: REALM,
    clientId: CLIENT_ID
  }),

  checkLogin() {
    console.log(this.keycloak)
    this.updateToken();
    return this.keycloak.authenticated;
  },

  async logIn() {
    console.log("logging in");
    if (!this.keycloak.isAuthenticated) {
      try {
        this.keycloak.init({ onLoad: "login-required", checkLoginIframe: false }).success(() => {
          console.log("successfully logged in");
          console.log(this.keycloak);
          //axios.defaults.headers.common.Authorization = `Bearer ${this.keycloak.token}`;
          this.props.userLoggedIn();
        }).error((e) => {
        console.log("failed to log in");
      });
        console.log(this.keycloak);
      } catch (e) {
        console.log("failed to log in");
        console.log(e)
      }
    }
  },

  async updateToken() {
    this.keycloak.updateToken(30).success(refreshed => {
      if (refreshed) {
        axios.defaults.headers.common.Authorization = `Bearer ${this.keycloak.token}`;
      }
    });
  },

  async logOut() {
    axios.defaults.headers.common.Authorization = "";

    if (this.keycloak.authenticated) {
      this.keycloak.logout().success(() => {
        // TODO: seems this code is never called
      });
    }
  }
};*/


export { keycloak }
