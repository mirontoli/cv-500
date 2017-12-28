import { message } from "antd";
import {
  GET_APPSTATE,
  GET_APPSTATE_SUCCESS,
  GET_APPSTATE_FAILED,
  UPDATE_APPSTATE,
  CHANGE_APP_LANGUAGE
} from "../constants";
import { getCsrfToken, getNextLanguage, prepareListData } from "../../utils/utils"; 

export const getState = () => {
  return dispatch => {
    dispatch({
      type: GET_APPSTATE
    });
    getCsrfToken()
      .then(csrf => {
        const body = JSON.stringify(csrf);
        fetch("/api/state", {
          method: "POST",
          accept: "application/json",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Произошла ошибка!");
            }
            return response.json();
          })
          .then(state => dispatch(getStateSuccess(state)))
          .catch(error => dispatch(getStateFailed(error.message)));
      })
      .catch(error => getStateFailed(error.message));
  };
};

export const getStateSuccess = state => {
  return dispatch => {
    dispatch({
      type: GET_APPSTATE_SUCCESS,
      data: prepareListData(state.data),
      loggedIn: state.loggedIn,
      rawData: state.data,
      user: state.user.length === undefined ? state.user : {},
    });
  };
};

export const getStateFailed = error => {
  message.error(error);
  return dispatch => {
    dispatch({
      type: GET_APPSTATE_FAILED,
      error
    });
  };
};

/* action updates state of app after user login or logout */
export const updateAppState = newState => {
  return dispatch => {
    dispatch({
      type: UPDATE_APPSTATE,
      loggedIn: newState.loggedIn,
      user: newState.user,
    });
  };
};

/* action changes app language and filters data by it */
export const changeAppLanguage = () => {
  return (dispatch, getState) => {
    const { language, languages, rawData } = getState().app;
    const nextLang = getNextLanguage(language, languages);
    dispatch({
      type: CHANGE_APP_LANGUAGE,
      language: nextLang,
      data: prepareListData(rawData, nextLang)
    });
  };
};
