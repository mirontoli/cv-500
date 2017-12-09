import React, { Component } from 'react';
import { Icon, Input, Table } from 'antd';
import Uniqid from 'uniqid';
import { dictionary } from './data/data';
import './App.css';

/* объявляем заголовки таблицы и рендеринг столбцов */
const columns = [{
  title: 'Термин',
  dataIndex: 'term',
  key: 'term',
  width: '10%',
  render: text => <span style={{fontSize: '18px'}}>{ text }</span>,
}, {
  title: 'Транскрипция',
  dataIndex: 'transcription',
  key: 'transcription',
  width: '10%',
}, {
  title: 'Перевод',
  dataIndex: 'translation',
  key: 'translation',
  width: '30%',
  render: text => <i>{ text }</i>
}, {
  title: 'Примеры',
  dataIndex: 'examples',
  key: 'examples',
  width: '50%',
  render: text => {
    return text.map(item => {
      return (<span key={Uniqid()}><b>{item.cv}</b>{item.ru ? ' - ' + item.ru : null}; </span>);
    })
  },
}];

export class App extends Component {
  constructor() {
    super();
    /* подготовим массив строк с уникальными идентификаторами */
    const data = this.prepareTableData(dictionary);
    /* создаем состояние */
    this.state = {
      /* исходный массив */
      data: data,
      /* копия исходного массива */
      dataSource: this.filterTableData(data),
      searchString: ''
    };
  }

  componentDidMount () {
    this.searchStringInput.focus();
  }

  /* метод готовит исходный массив данных с уникальными id */
  prepareTableData = (dictionary) => {
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
  }

  /* метод возвращает массив отфильтрованный из исходного массива строк */
  filterTableData = (data, term = null) => {
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
      const re = new RegExp('^' + term,'i');
      dataSource = data.filter(item => {
        return item.term.search(re) !== -1;
      });
    }
    return dataSource;
  }

  /* метод синхронизирует ввод текста с состоянием и возвращает отфильтрованный массив строк */
  handleChange = (e) => {
    const term = e.target.value;
    const dataSource = this.filterTableData(this.state.data, term);
    this.setState({ searchString: term, dataSource });
  }

  /* метод очищает строку поиска и возвращает исходный массив строк */
  emitEmpty = () => {
    this.searchStringInput.focus();
    const dataSource = this.filterTableData(this.state.data);
    this.setState({ searchString: '', dataSource });
  }

  render() {
    const { dataSource, searchString } = this.state;
    const suffix = searchString ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div>
        <div className="header">500 чувашских слов</div>
        <div className="container">
          <Input
            style={{ margin: '10px 0'}}
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={suffix}
            value={searchString}
            onChange={this.handleChange}
            ref={node => this.searchStringInput = node}
          />
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
            bordered
          />
        </div>
      </div>
    );
  }
}