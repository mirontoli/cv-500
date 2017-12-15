import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Col, Icon, Input, Row, List } from 'antd';
import { prepareListData, filterListData } from '../utils/utils';
import { ChuvashLetters } from './ChuvashLetters';
import './App.css';

export class App extends Component {
  state = {
    data: [],
    dataSource: [],
    loading: true,
    searchString: '',
    currentPage: 1,
    num: 0,
  };

  componentWillMount () {
    const rootRef = firebase.database().ref();
    rootRef.on('value', snap => {
      const rawData = snap.val();
      const preparedData = prepareListData(rawData);
      const { dataSource, num } = filterListData(preparedData);
      this.setState({
        data: preparedData,
        dataSource,
        loading: false,
        num,
      });
    });
  }

  componentDidMount() {
    this.searchStringInput.focus();
  }

  /* метод добавляет чуашскую букву к строке поиска и вызывает фильтрацию и сохранение состояние */
  handleBtnClick = (letter) => {
    const term = this.state.searchString + letter;
    const { dataSource, num } = filterListData(this.state.data, term);
    this.setState({ searchString: term, dataSource, num });
  }

  /* метод добавляет символ к строке поиска и вызывает фильтрацию и сохранение состояние */
  handleChange = (e) => {
    const term = e.target.value;
    const { dataSource, num } = filterListData(this.state.data, term);
    this.setState({ searchString: term, dataSource, num });
  }

  handleChangePage = (page) => {
    const term = this.state.searchString;
    const { dataSource, num } = filterListData(this.state.data, term, page);
    this.setState({ currentPage: page, dataSource, num });
  }

  /* метод очищает строку поиска и состояние на исходный  массив строк */
  emitEmpty = () => {
    this.searchStringInput.focus();
    const { dataSource, num } = filterListData(this.state.data);
    this.setState({ searchString: '', dataSource, num });
  }

  render() {
    const { currentPage, dataSource, loading, num, searchString } = this.state;
    const suffix = searchString ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const pagination = {
      pageSize: 10,
      current: currentPage,
      total: num,
      onChange: (page => this.handleChangePage(page)),
    };
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
          <List
            loading={loading}
            itemLayout="vertical"
            size="large"
            bordered={true}
            pagination={pagination}
            dataSource={dataSource}
            renderItem={item => (
              <List.Item
                key={item.title}
              >
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </div>
        <footer className="footer"><p>© "Хавал" чăваш халăх пĕрлешĕвĕ {new Date().getFullYear()}</p></footer>
      </div>
    );
  }
}