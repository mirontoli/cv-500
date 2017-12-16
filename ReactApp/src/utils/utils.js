import React from 'react';
import Uniqid from 'uniqid';

/** 
 * method prepares terms data for list
 * @param {Object} dictionary
 * @returns {Array}
 */
export const prepareListData = (dictionary, lang = 'ru') => {
  let dataSource = [];
  if (dictionary && Object.keys(dictionary).length) {
    Object.keys(dictionary).forEach(item => {
      dataSource.push({
        key: item,
        id: item, 
        title: dictionary[item].term + ' (' + dictionary[item].transcription + ')',
        description: prepareTranslationByLang(dictionary[item].translation, lang),
        content: prepareExamplesData(dictionary[item].examples, lang),
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
export const filterListData = (data, term = null, page = 1) => {
  let dataSource = [];
  let num = 0;
  if (!term) {
    dataSource = data.map(item => {
      return {
        key: item.id,
        id: item.id,
        title: item.title,
        description: item.description,
        content: item.content,
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
  return { dataSource, num };
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