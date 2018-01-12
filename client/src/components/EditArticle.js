import React, { Component } from "react";
import { array, bool, object, string } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Row } from "antd";
import { TranslationsList } from "./TranslationsList";
import { AddExampleForm } from './AddExampleForm';
import { ExamplesList } from './ExamplesList';

class EditArticleForm extends Component {
  state = {
    id: "",
    term: "",
    transcription: "",
    translation: {},
    audio: "",
    example: {
      index: null,
      lang: null,
      text: null,
    },
    examples: []
  };

  static propTypes = {
    rawData: array.isRequired,
    labels: object.isRequired,
    language: string.isRequired,
    languages: array.isRequired,
    loggedIn: bool.isRequired
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    const article = this.props.rawData.filter(item => {
      return id === item.id;
    });
    if (article) {
      this.setState({
        id,
        term: article[0].term,
        transcription: article[0].transcription,
        translation: article[0].translation,
        audio: article[0].audio,
        examples: article[0].examples
      });
    }
  }

  /**
   * @param {Object} example
   */
  handleExamplesUpdate = (example) => {
    let examples = this.state.examples.map((item, index) => {
      let newItem;
      if (index.toString() === example.index) {
        newItem = {...item};
        newItem[example.lang] = example.text;
      } else {
        newItem = {...item};
      }
      return newItem;
    });
    if(!example.index) {
      examples.push({ [example.lang]: example.text });
    }
    this.setState({ examples });
  }

  /**
   * @param {string} action
   * @param {number} num
   * @param {string} lang
   */
  handleClick = (action, num, lang) => {
    let example = {index: null, lang: null, text: null};
    switch (action) {
      case 'add': 
        example = {
          index: num.toString(),
          lang: null,
          text: null,
        }; break;
      case 'edit':
        example = {
          index: num.toString(),
          lang: lang,
          text: this.state.examples[num][lang],
        }; break;
      case 'new':
        example = {
          index: null,
          lang: lang,
          text: null,
        }; break;
      case 'delete':
        break;
    }
    this.setState({ example });
  }

  render() {
    const { id, term, translation, transcription, example, examples } = this.state;
    const { labels, language, languages } = this.props;
    return (
      <form>
        <b>{labels.formTermField[language]}</b>
        <Input style={{ margin: '10px 0' }} value={term}/>
        <b>{labels.formTranscriptionField[language]}</b>
        <Input style={{ margin: '10px 0' }} value={transcription} />
        <b>{labels.formTranslationsBlock[language]}</b>
        <Row>
          <TranslationsList id={id} translations={translation} handleClick={this.handleClick} />
        </Row>
        <b>{labels.formExamplesBlock[language]}</b>
        <Row>
          <ExamplesList id={id} exampleId={example.index} examples={examples} handleClick={this.handleClick} />
          <AddExampleForm example={example} labels={labels} language={language} languages={languages} handleUpdate={this.handleExamplesUpdate} />
        </Row>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  rawData: state.app.rawData,
  labels: state.app.labels,
  language: state.app.language,
  languages: state.app.languages,
  loggedIn: state.auth.loggedIn
});

//   const mapDispatchToProps = dispatch => bindActionCreators({
//     login
//   }, dispatch);

export default connect(mapStateToProps, null)(EditArticleForm);
