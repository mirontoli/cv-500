import React, { Component } from "react";
import { array, bool, object, string } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Steps } from "antd";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { Actions } from "./Actions";

const Step = Steps.Step;

class EditArticleForm extends Component {
  state = {
    audio: "",
    id: "",
    current: 0,
    example: {
      index: null,
      lang: null,
      text: null
    },
    examples: [],
    term: "",
    transcription: "",
    translation: {}
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

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  /**
   * updates term, transcription and audio text in state on input
   * @param {string} value
   * @param {string} key
   */
  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  /**
   * @param {Object} example
   */
  handleUpdate = example => {
    let examples = this.state.examples.map((item, index) => {
      let newItem;
      if (index.toString() === example.index) {
        newItem = { ...item };
        newItem[example.lang] = example.text;
      } else {
        newItem = { ...item };
      }
      return newItem;
    });
    if (!example.index) {
      examples.push({ [example.lang]: example.text });
    }
    this.setState({ examples });
  };

  /**
   * @param {string} action
   * @param {number} num
   * @param {string} lang
   */
  handleChangeElement = (action, num, lang) => {
    let example = { index: null, lang: null, text: null };
    switch (action) {
      case "add":
        example = {
          index: num.toString(),
          lang: null,
          text: null
        };
        break;
      case "edit":
        example = {
          index: num.toString(),
          lang: lang,
          text: this.state.examples[num][lang]
        };
        break;
      case "new":
        example = {
          index: null,
          lang: lang,
          text: null
        };
        break;
      case "delete":
        break;
      default:
    }
    this.setState({ example });
  };

  render() {
    const {
      audio,
      id,
      current,
      example,
      examples,
      term,
      translation,
      transcription
    } = this.state;
    const { labels, language, languages } = this.props;
    let example_languages = [];
    const steps = [
      {
        title: labels.EditFormStepOne[language],
        content: (
          <StepOne
            audio={audio}
            handleChange={this.handleChange}
            labels={labels}
            language={language}
            term={term}
            transcription={transcription}
          />
        )
      },
      {
        title: labels.EditFormStepTwo[language],
        content: (
          <StepTwo
            handleChangeElement={this.handleChangeElement}
            handleUpdate={this.handleUpdate}
            id={id}
            labels={labels}
            language={language}
            translation={translation}
          />
        )
      },
      {
        title: labels.EditFormStepThree[language],
        content: (
          <StepThree
            example={example}
            example_languages={example_languages}
            examples={examples}
            handleChangeElement={this.handleChangeElement}
            handleUpdate={this.handleUpdate}
            id={id}
            labels={labels}
            language={language}
            languages={languages}
          />
        )
      }
    ];
    if (languages.length) {
      if (example.index) {
        example_languages = languages.filter(item => {
          return item !== examples[example.index][item];
        });
      } else {
        example_languages = [...languages];
      }
    }
    return (
      <form>
        <Steps style={{ marginTop: '20px' }} current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <Actions current={current} next={this.next} prev={this.prev} total={steps.length} />
        {steps[current].content}
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
