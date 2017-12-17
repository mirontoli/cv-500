import React, { Component } from 'react';
//import * as firebase from 'firebase';
import { Button, Col, Icon, Input, Row, List } from 'antd';
import { labels } from '../translations/translations';
import { prepareListData, filterListData } from '../utils/utils';
import { ChuvashLetters } from './ChuvashLetters';
import { Aux } from "../utils/utils";
import './App.css';

//import { rawData } from '../data/data';

export class App extends Component {
  state = {
    data: [],
    dataSource: [],
    loading: true,
    rawData: [],
    searchString: '',
    currentPage: 1,
    num: 0,
    lang: 'ru',
  };

  // componentWillMount () {
    // const rootRef = firebase.database().ref();
    // rootRef.on('value', snap => {
      // const rawData = snap.val();
      // const preparedData = prepareListData(rawData, this.state.lang);
      // const { dataSource, num } = filterListData(preparedData);
      // this.setState({
      //   data: preparedData,
      //   dataSource,
      //   loading: false,
      //   num,
      // });
    // });
  // }

  componentDidMount() {
    fetch('/api/get-articles')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка получения данных");
        }
      })
      .then(rawData => {
        const preparedData = prepareListData(rawData, this.state.lang);
        const { dataSource, num } = filterListData(preparedData);
        this.setState({
          data: preparedData,
          dataSource,
          loading: false,
          rawData,
          num,
        });
      })
      .catch(err => {
        console.log('error fetching data', err.message)
      });
    this.searchStringInput.focus();
  }

  handleLangChange = () => {
    this.setState({ loading: true });
    const langs = ['ru', 'cv', 'eo'];
    const position = langs.indexOf(this.state.lang);
    const nextLang = langs[position + 1] ? langs[position + 1] : langs[0];
    const preparedData = prepareListData(this.state.rawData, nextLang);
    const { dataSource, num } = filterListData(preparedData);
    this.setState({
      data: preparedData,
      dataSource,
      loading: false,
      num,
      lang: nextLang
    });
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
    const { currentPage, dataSource, lang, loading, num, searchString } = this.state;
    const suffix = searchString ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const pagination = {
      pageSize: 10,
      current: currentPage,
      total: num,
      onChange: (page => this.handleChangePage(page)),
    };
    return (
      <div className="container">
        <Row className="header">
          <Col xs={21} sm={22} md={23} xl={23}>{ labels.pageTitle[lang]}</Col>
          <Col xs={3} sm={2} md={1} xl={1}>
            <img className="lang-switcher" src={"/images/" + lang + ".jpg"} alt="cv" onClick={this.handleLangChange} />
          </Col>
        </Row>
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
        <Row>
          <List
            loading={loading}
            itemLayout="vertical"
            size="large"
            bordered={true}
            pagination={pagination}
            dataSource={dataSource}
            renderItem={item => (
              <List.Item
                key={'card-' + item.id}
              >
                <List.Item.Meta
                  title={(
                    <Aux>
                      { item.audio ? 
                        <Aux>
                          <Button style={{marginRight: '5px'}} size={'small'} shape="circle" icon="play-circle-o"
                            onClick={() => {
                              this['audio' + item.id].play();
                            }}
                          />
                          <audio
                            ref={(audio) => { this['audio' + item.id] = audio } }
                          ><source src={item.audio} type="audio/mp3" /></audio>
                        </Aux> : null }
                      {item.title}
                    </Aux>)}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Row>
        <footer className="footer"><p>© { labels.pageFooter[lang]} {new Date().getFullYear()}</p></footer>
      </div>
    );
  }
}