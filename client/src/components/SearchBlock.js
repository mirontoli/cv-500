import React, { Component } from "react";
import { func, string } from "prop-types";
import { Col, Icon, Input, Row } from 'antd';
import { ChuvashLetters } from '../components/ChuvashLetters';

export class SearchBlock extends Component {
  static propTypes = {
    handleChange: func.isRequired,
    searchString: string.isRequired
  };

  componentDidMount() {
    this.searchStringInput.focus();
  }

  emitEmpty = () => {
    this.props.handleChange('');
    this.searchStringInput.focus();
  }

  /* метод добавляет чуашскую букву к строке поиска и вызывает фильтрацию и сохранение состояние */
  handleBtnClick = (letter) => {
    this.props.handleChange(this.props.searchString + letter);
  }

  render() {
    const { searchString, handleChange } = this.props;
    const suffix = searchString ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <Row style={{ margin: "10px 0" }}>
        <Col xs={24} sm={16} md={18} xl={20}>
          <Input
            style={{ marginBottom: "10px" }}
            prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
            suffix={suffix}
            value={searchString}
            onChange={(e) => handleChange(e.target.value)}
            ref={node => (this.searchStringInput = node)}
          />
        </Col>
        <Col xs={24} sm={8} md={6} xl={4} style={{ textAlign: "center" }}>
          <ChuvashLetters handleBtnClick={this.handleBtnClick} />
        </Col>
      </Row>
    );
  }
}
