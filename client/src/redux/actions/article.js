import { message } from "antd";
import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILED,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILED,
} from "../constants";
import { getState } from "./app";
import { getCsrfToken } from "../../utils/utils";

export const createArticle = (article) => {
    return dispatch => {
      dispatch({
        type: CREATE_ARTICLE
      });
  
      getCsrfToken()
        .then(csrf => {
          csrf.Article = {...article};
          const body = JSON.stringify(csrf);    
          fetch("/api/article", {
            method: "CREATE",
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
              } else {
                throw new Error("Произошла ошибка");
              }
            })
            .then(result => dispatch(createArticleSuccess(result)))
            .catch(error => dispatch(createArticleFailed(error.message)));
        })
        .catch(error => dispatch(createArticleFailed(error.message)));  
    }
  };
  
  export const createArticleSuccess = result => {
    message.success('Статья успешно добавлена');
    return dispatch => {
      dispatch({
        type: CREATE_ARTICLE_SUCCESS
      });
      dispatch(getState());
    };
  };
  
  export const createArticleFailed = error => {
    message.error(error);
    return dispatch => {
      dispatch({
        type: CREATE_ARTICLE_FAILED
      });
    };
  };
  
  // ************************************* //

  export const updateArticle = (article) => {
    return dispatch => {
      dispatch({
        type: UPDATE_ARTICLE
      });
  
      getCsrfToken()
        .then(csrf => {
          csrf.Article = {...article};
          const body = JSON.stringify(csrf);    
          fetch("/api/article", {
            method: "UPDATE",
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
              } else {
                throw new Error("Произошла ошибка");
              }
            })
            .then(result => dispatch(updateArticleSuccess(result)))
            .catch(error => dispatch(updateArticleFailed(error.message)));
        })
        .catch(error => dispatch(updateArticleFailed(error.message)));  
    }
  };
  
  export const updateArticleSuccess = result => {
    message.success('Статья успешно обновлена');
    return dispatch => {
      dispatch({
        type: UPDATE_ARTICLE_SUCCESS
      });
      dispatch(getState());
    };
  };
  
  export const updateArticleFailed = error => {
    message.error(error);
    return dispatch => {
      dispatch({
        type: UPDATE_ARTICLE_FAILED
      });
    };
  };