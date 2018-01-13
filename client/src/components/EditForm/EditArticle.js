import React, { Component } from "react";
import { array, bool, func, object, string } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Steps } from "antd";
import { createArticle, updateArticle } from '../../redux/actions/article';
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { Actions } from "./Actions";

const Step = Steps.Step;
const empty = { index: null, lang: null, text: null };

class EditArticleForm extends Component {
  state = {
    audio: "",
    error: null,
    id: "",
    current: 0,
    example: { ...empty },
    examples: [],
    term: "",
    transcriptions: "",
    translation: { ...empty },
    translations: {}
  };

  static propTypes = {
    createArticle: func.isRequired,
    labels: object.isRequired,
    language: string.isRequired,
    languages: array.isRequired,
    loggedIn: bool.isRequired,
    rawData: array.isRequired,
    updateArticle: func.isRequired,
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    const article = this.props.rawData.filter(item => {
      return id === item.id;
    });
    if (article) {
      /* translation can be string of russian text or object with { lang: translation } properties */
      let translations;
      if (typeof article[0].translation === "string") {
        translations = { ru: article[0].translation };
      } else {
        translations = { ...article[0].translation };
      }
      this.setState({
        id,
        term: article[0].term,
        transcription: article[0].transcription,
        translations: translations,
        audio: article[0].audio,
        examples: article[0].examples
      });
    }
  }

  next = () => {
    const current = this.state.current + 1;
    if (current === 1 && !this.state.term) {
      this.setState({
        error: this.props.labels.formFirstStepError[this.props.language]
      });
    } else {
      this.setState({ current, error: null });
    }
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  done = () => {
    const article = {
      id: this.state.id ? this.state.id : null,
      term: this.state.term,
      transcription: this.state.transcription,
      translation: this.state.translations,
      examples: this.state.examples,
      audio: this.state.audio,
    };
    if (this.state.id) {
      this.props.updateArticle(article);
    } else {
      this.props.createArticle(article);
    }
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
   * @param {Object} data
   * @param {string} data
   */
  handleUpdate = (data, key) => {
    if (key === "example") {
      const examples = this.state.examples.map((item, index) => {
        let newItem;
        if (data.index !== null && index.toString() === data.index.toString()) {
          newItem = { ...item };
          newItem[data.lang] = data.text;
        } else {
          newItem = { ...item };
        }
        return newItem;
      });
      if (!data.index) {
        examples.push({ [data.lang]: data.text });
      }
      this.setState({ example: { ...empty }, examples });
    } else if (key === "translation") {
      let translations = { ...this.state.translations };
      translations[data.lang] = data.text;
      this.setState({ translation: { ...empty }, translations });
    }
  };

  /**
   * @param {string} action
   * @param {number} num
   * @param {string} lang
   */
  handleChangeElement = (action, num, lang) => {
    let example = { ...empty };
    let translation = { ...empty };
    switch (action) {
      case "addExample": {
        this.setState({ example });
        break;
      }
      case "editExample": {
        example = {
          index: num.toString(),
          lang,
          text: this.state.examples[num][lang]
        };
        this.setState({ example });
        break;
      }
      case "deleteExample": {
        if (this.state.examples.length) {
          const examples = this.state.examples.filter((item, i) => {
            return i !== num;
          });
          this.setState({ examples });
        }
        break;
      }
      case "addExampleElement": {
        example.index = num.toString();
        this.setState({ example });
        break;
      }
      case "editExampleElement": {
        example = {
          index: num.toString(),
          lang,
          text: this.state.examples[num][lang]
        };
        this.setState({ example });
        break;
      }
      case "deleteExampleElement": {
        if (this.state.examples.length) {
          const examples = this.state.examples.map((item, i) => {
            if (i === num) {
              const newItem = { ...item };
              delete newItem[lang];
              return newItem;
            } else {
              return { ...item };
            }
          });
          this.setState({ examples });
        }
        break;
      }
      case "addTranslation": {
        this.setState({ translation });
        break;
      }
      case "editTraslation": {
        translation.index = 0;
        translation.lang = lang; 
        translation.text = this.state.translations[lang];
        this.setState({ translation });
        break;
      }
      case "deleteTranslation": {
        let translations = { ...this.state.translations };
        delete translations[lang];
        this.setState({ translations });
        break;
      }
      default:
    }
  };

  render() {
    const {
      audio,
      id,
      current,
      error,
      example,
      examples,
      term,
      translation,
      translations,
      transcription
    } = this.state;
    const { labels, language, languages } = this.props;
    let translationLanguages = [];
    let exampleLanguages = [];
    if (languages.length) {
      translationLanguages = languages.filter(item => {
        return !translations.hasOwnProperty(item) && item !== "cv";
      });
      if (example.index !== null && examples.length) {
        exampleLanguages = languages.filter(item => {
          return !examples[example.index].hasOwnProperty(item);
        });
      } else {
        exampleLanguages = ["cv"];
      }
    }
    const steps = [
      {
        title: labels.editFormStepOne[language],
        content: (
          <StepOne
            audio={audio}
            error={error}
            handleChange={this.handleChange}
            labels={labels}
            language={language}
            term={term}
            transcription={transcription}
          />
        )
      },
      {
        title: labels.editFormStepTwo[language],
        content: (
          <StepTwo
            handleChangeElement={this.handleChangeElement}
            handleUpdate={this.handleUpdate}
            id={id}
            labels={labels}
            language={language}
            translation={translation}
            translations={translations}
            translationLanguages={translationLanguages}
          />
        )
      },
      {
        title: labels.editFormStepThree[language],
        content: (
          <StepThree
            example={example}
            exampleLanguages={exampleLanguages}
            examples={examples}
            handleChangeElement={this.handleChangeElement}
            handleUpdate={this.handleUpdate}
            id={id}
            labels={labels}
            language={language}
          />
        )
      }
    ];
    return (
      <div>
        <Steps style={{ marginTop: "20px" }} current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <Actions
          current={current}
          next={this.next}
          prev={this.prev}
          done={this.done}
          total={steps.length}
        />
        {steps[current].content}
      </div>
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

  const mapDispatchToProps = dispatch => bindActionCreators({
    createArticle,
    updateArticle,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleForm);
