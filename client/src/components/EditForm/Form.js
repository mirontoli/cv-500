import React, { Component } from "react";
import { array, func, object, string } from "prop-types";
import { Alert, Col, Button, Input, Select } from "antd";

const Option = Select.Option;

export class Form extends Component {
  state = {
    index: null,
    lang: null,
    text: null,
    error: false
  };
  static propTypes = {
    data: object,
    handleUpdate: func.isRequired,
    labels: object.isRequired,
    language: string.isRequired,
    languages: array.isRequired,
    type: string.isRequired
  };

  componentWillMount() {
    this.setState({
      index: this.props.data.index,
      lang: this.props.data.lang,
      text: this.props.data.text
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.data.index,
      lang: nextProps.data.lang,
      text: nextProps.data.text
    });
  }

  handleChange = value => {
    this.setState({ lang: value });
  };

  render() {
    const { error, index, lang, text } = this.state;
    const {
      data,
      handleUpdate,
      labels,
      language,
      languages,
      type
    } = this.props;
    const disabled = data.index !== null && data.lang !== null ? true : false;
    let buttonTitle = !disabled ? labels.formAddElementButton[language] : labels.formSaveElementButton[language];
    let options = [];
    if (languages.length) {      
      options = languages.map(item => {
        return (
          <Option key={"option-" + item} value={item}>
            {item}
          </Option>
        );
      });
    } else if (!languages.length && data.index !== null && data.lang) {
      options.push(
        <Option key={"option-" + data.lang} value={data.lang}>
          {data.lang}
        </Option>
      );
    }
    return (
      <Col span={12}>
        {options.length ? (
          <Select
            style={{ marginBottom: "5px", width: "100%" }}
            disabled={disabled}
            value={lang}
            onChange={this.handleChange}
          >
            {options}
          </Select>
        ) : null}
        <Input
          style={{ marginBottom: "5px" }}
          value={text}
          onChange={e => {
            this.setState({ text: e.target.value });
          }}
        />
        <Button
          onClick={() => {
            if (lang && text) {
              handleUpdate({ index, lang, text }, type);
            } else {
              this.setState({ error: true });
            }
          }}
        >
          {buttonTitle}
        </Button>
        {error ? (
          <Alert
            style={{ marginTop: "5px" }}
            message={labels.formAddElementError[language]}
            type="error"
            showIcon
          />
        ) : null}
      </Col>
    );
  }
}
