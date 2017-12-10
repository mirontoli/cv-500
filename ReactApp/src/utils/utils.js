import React from 'react';
import Uniqid from 'uniqid';

/** 
 * метод готовит исходный массив данных с уникальными id
 * @param {Array} dictionary
 * @returns {Array}
 */
export const prepareListData = dictionary => {
  let dataSource = [];
  if (dictionary && dictionary.length) {
    dataSource = dictionary.map(item => {
      const id =  Uniqid();
      return {
        key: id,
        id: id, 
        title: item.term + ' (' + item.transcription + ')',
        description: item.translation,
        content: prepareExamplesData(item.examples),
      };
    });
  }
  return dataSource;
};

/** 
 * метод возвращает массив отфильтрованный из исходного массива строк
 * @param {Array} data
 * @param {string} term
 * @param {page} number
 * @returns {Array}
 */
export const filterListData = (data, term = null, page = 1) => {
  let dataSource = [];
  if (!term) {
    const slicedData = data.slice(page * 10 - 10, page * 10);
    dataSource = slicedData.map(item => {
      return {
        key: item.id,
        id: item.id,
        title: item.title,
        description: item.description,
        content: item.content,
      };
    });
  } else {
    /* создаем регулярку для поиска строки */
    const re = new RegExp("^" + term, "i");
    dataSource = data.filter(item => {
      return item.title.search(re) !== -1;
    });
  }
  return dataSource;
};

const prepareExamplesData = (examples) => {
  if (examples && examples.length) {
    return examples.map(item => {
      return (<span key={Uniqid()}><b>{item.cv}</b>{item.ru ? ' - ' + item.ru : null}; </span>);
    })
  } else {
    return null;
  }
}