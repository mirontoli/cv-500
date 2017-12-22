import sha256 from "js-sha256";
import { message } from "antd";
import { updateAppState } from "./app";
import { getCsrfToken } from "../../utils/utils"; 

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from "../constants";

export const login = (username, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN
    });

    getCsrfToken()
      .then(csrf => {
        csrf.LoginForm = {
          username: username,
          password: sha256(password)
        };
        const body = JSON.stringify(csrf);    
        fetch("/api/login", {
          method: "POST",
          accept: "application/json",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body,
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            if(response.status === 400) {
              throw new Error("Неверный логин или пароль");
            } else {
              throw new Error("Произошла ошибка");
            }
          })
          .then(result => dispatch(loginSuccess(result)))
          .catch(error => dispatch(loginFailed(error.message)));
      })
      .catch(error => dispatch(loginFailed(error.message)));  
  }
};

export const loginSuccess = result => {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      loggedIn: result.loggedIn
    });
    dispatch(updateAppState(result));
  };
};

export const loginFailed = error => {
  message.error(error);
  return dispatch => {
    dispatch({
      type: LOGIN_FAILED,
      error
    });
  };
};

// ************************************* //

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    });
    getCsrfToken()
      .then(csrf => {
        const body = JSON.stringify(csrf);
        fetch("/api/logout", {
          method: "POST",
          accept: "application/json",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body,
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Произошла ошибка");
          })
          .then(result => dispatch(logoutSuccess(result)))
          .catch(error => dispatch(logoutFailed(error.message)));
      })
      .catch(error => dispatch(logoutFailed(error.message)));
  };
};

export const logoutSuccess = result => {
  return dispatch => {
    dispatch({
      type: LOGOUT_SUCCESS,
      loggedIn: result.loggedIn
    });
    dispatch(updateAppState(result));
  };
};

export const logoutFailed = error => {
  message.error(error);
  return dispatch => {
    dispatch({
      type: LOGOUT_FAILED,
      error
    });
  };
};
