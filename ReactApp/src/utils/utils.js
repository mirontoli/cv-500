import React from 'react';
import Uniqid from 'uniqid';

/** 
 * method prepares terms data for list
 * @param {Object} dictionary
 * @returns {Array}
 */
export const prepareListData = dictionary => {
  let dataSource = [];
  if (dictionary && Object.keys(dictionary).length) {
    Object.keys(dictionary).forEach(item => {
      dataSource.push({
        key: item,
        id: item, 
        title: dictionary[item].term + ' (' + dictionary[item].transcription + ')',
        description: dictionary[item].translation,
        content: prepareExamplesData(dictionary[item].examples),
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

/**
 * method prepares examples of terms using
 * @param {Array} examples 
 */
const prepareExamplesData = (examples) => {
  if (examples && examples.length) {
    return examples.map(item => {
      return (<span key={Uniqid()}><b>{item.cv}</b>{item.ru ? ' - ' + item.ru : null}; </span>);
    })
  } else {
    return null;
  }
}