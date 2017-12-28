import React from 'react';
import Uniqid from 'uniqid';

/** 
 * method prepares terms data for list
 * @param {Array} dictionary
 * @returns {Array}
 */
export const prepareListData = (dictionary = [], lang = 'ru') => {
  let dataSource = [];
  if (dictionary.length) {
    dictionary.forEach(item => {
      dataSource.push({
        key: item.id,
        id: item.id, 
        title: item.term + ' (' + item.transcription + ')',
        description: prepareTranslationByLang(item.translation, lang),
        content: prepareExamplesData(item.examples, lang),
        audio: item.audio,
      });
    });
  }
  return dataSource;
};

/** 
 * method filters data by term
 * @param {Array} data
 * @param {string} term
 * @param {page} number
 * @returns {Array}
 */
export const filterListData = (data = [], term = null, page = 1) => {
  let dataSource = [];
  let num = 0;
  if (data.length) {
    if (!term) {
      dataSource = data.map(item => {
        return {
          key: item.id,
          id: item.id,
          title: item.title,
          description: item.description,
          content: item.content,
          audio: item.audio,
        };
      });
    } else {
      dataSource = data.filter(item => {
        return item.title.indexOf(term.toLocaleLowerCase()) === 0;
      });
    }
    num = dataSource.length;
    if (num > 10) {
      dataSource = dataSource.slice(page * 10 - 10, page * 10);
    }
  }
  return { dataSource, num };
};

export const getNextLanguage = language => {
  const langs = ["ru", "cv", "eo"];
  const position = langs.indexOf(language);
  const nextLang = langs[position + 1] ? langs[position + 1] : langs[0];
  return nextLang;
};

const prepareTranslationByLang = (data, lang) => {
  let description;
  if (typeof(data) !== 'string') {
    if (data[lang]) {
      description = data[lang];
    } else {
      description = data['ru'];
    }
  } else {
    description = data;
  }
  return description;
}

/**
 * method prepares examples of terms using
 * @param {Array} examples 
 */
const prepareExamplesData = (examples, lang = 'ru') => {
  if (examples && examples.length) {
    return examples.map(item => {
      let row;
      if (lang !== 'cv') {
        row = (<span key={Uniqid()}><b>{item.cv}</b>{item[lang] ? ' - ' + item[lang] : item.ru ? ' - ' + item.ru : null}; </span>);
      } else {
        row = (<span key={Uniqid()}><b>{item.cv}</b>{item.ru ? ' - ' + item.ru : null}; </span>);
      }
      return row;
    })
  } else {
    return null;
  }
}

export const Aux = (props) => {
  return props.children;
};

export const getCsrfToken = () => {
  return new Promise((resolve, reject) => {
    fetch("/csrfToken", {
      method: "GET",
      accept: "application/json",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Произошла ошибка!");
        }
        return response.json();
      })
      .then(csrf => {
        resolve(csrf);
      })
      .catch(error => {
        reject(error.message);
      });
  });
}