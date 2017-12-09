import Uniqid from 'uniqid';

/* метод готовит исходный массив данных с уникальными id */
export const prepareTableData = dictionary => {
  const dataSource = dictionary.map(item => {
    return {
      key: Uniqid(),
      term: item.term,
      transcription: item.transcription,
      translation: item.translation,
      examples: item.examples
    };
  });
  return dataSource;
};

/* метод возвращает массив отфильтрованный из исходного массива строк */
export const filterTableData = (data, term = null) => {
  let dataSource = [];
  if (!term) {
    dataSource = data.map(item => {
      return {
        key: Uniqid(),
        term: item.term,
        transcription: item.transcription,
        translation: item.translation,
        examples: item.examples
      };
    });
  } else {
    /* создаем регулярку для поиска строки */
    const re = new RegExp("^" + term, "i");
    dataSource = data.filter(item => {
      return item.term.search(re) !== -1;
    });
  }
  return dataSource;
};
