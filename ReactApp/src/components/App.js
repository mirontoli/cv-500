import React, { Component } from 'react';
import { Col, Icon, Input, Row, Table } from 'antd';
import Uniqid from 'uniqid';
import { dictionary } from '../data/data';
import { prepareTableData, filterTableData } from '../utils/utils';
import { ChuvashLetters } from './ChuvashLetters';
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
    const data = prepareTableData(dictionary);
    /* создаем состояние */
    this.state = {
      /* исходный массив */
      data: data,
      /* копия исходного массива */
      dataSource: filterTableData(data),
      searchString: ''
    };
  }

  componentDidMount () {
    this.searchStringInput.focus();
  }

  /* метод добавляет чуашскую букву к строке поиска и вызывает фильтрацию и сохранение состояние */
  handleBtnClick = (letter) => {
    const term = this.state.searchString + letter;
    const dataSource = filterTableData(this.state.data, term);
    this.setState({ searchString: term, dataSource });
  }

  /* метод добавляет символ к строке поиска и вызывает фильтрацию и сохранение состояние */
  handleChange = (e) => {
    const term = e.target.value;
    const dataSource = filterTableData(this.state.data, term);
    this.setState({ searchString: term, dataSource });
  }

  /* метод очищает строку поиска и состояние на исходный  массив строк */
  emitEmpty = () => {
    this.searchStringInput.focus();
    const dataSource = filterTableData(this.state.data);
    this.setState({ searchString: '', dataSource });
  }

  render() {
    const { dataSource, searchString } = this.state;
    const suffix = searchString ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div>
        <div className="header">500 основных корней чувашских слов</div>
        <div className="container">
          <Row style={{ margin: '10px 0'}}>
            <Col xs={24} sm={16} md={18} xl={20}>
              <Input
                style={{ marginBottom: '10px'}}
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={suffix}
                value={searchString}
                onChange={this.handleChange}
                ref={node => this.searchStringInput = node}
              />
            </Col>
            <Col xs={24} sm={8} md={6} xl={4} style={{ textAlign: 'center' }}>
              <ChuvashLetters handleBtnClick={this.handleBtnClick} />
            </Col>
          </Row>
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