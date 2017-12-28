import React, { Component } from "react";
import { array, func, object, string } from "prop-types";
import { Alert, Col, Button, Input, Select } from "antd";

const Option = Select.Option;

export class AddExampleForm extends Component {
  state = {
    index: null,
    lang: null,
    text: null,
    error: false,
  };
  static propTypes = {
    example: object.isRequired,
    labels: object.isRequired,
    language: string.isRequired,
    languages: array.isRequired,
    handleUpdate: func.isRequired
  };

  componentWillMount () {
    this.setState({
      index: this.props.example.index,
      lang: this.props.example.index ? this.props.example.lang : 'cv',
      text: this.props.example.text,
    });
  }

  handleChange = (value) => {
    this.setState({lang: value});
  }

  render() {
    const { error, index, lang, text } = this.state;
    const { example, labels, language, languages, handleUpdate } = this.props;
    return (
      <Col span={12}>
        { !index ? <b>{labels.formAddExampleNew[language]}</b> : <b>{example.title}</b>}
        <Select style={{marginBottom: '5px'}} value={lang} onChange={this.handleChange} disabled={index ? false : true}>
          {languages.length
            ? languages.map(item => {
                return <Option key={'option-' + item} value={item}>{item}</Option>;
              })
            : null}
        </Select>
        <Input
          style={{marginBottom: '5px'}}
          value={text}
          onChange={(e) => {
            this.setState({text: e.target.value});
          }} />
        <Button
          onClick={() => {
            if (lang !== '-' && text !== '') {
              handleUpdate({index, lang, text});
            } else {
              this.setState({error: true});
            }            
        }}>{labels.formAddExampleButton[language]}</Button>
        { error ? <Alert message={labels.formAddExampleError[language]} type="error" showIcon /> : null}
      </Col>
    );
  }
}
