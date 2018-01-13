import React from "react";
import { array, func, object, string } from "prop-types";
import { Button, Row } from "antd";
import { TranslationsList } from "./TranslationsList";
import { Form } from "./Form";

export const StepTwo = ({
  handleChangeElement,
  handleUpdate,
  id,
  labels,
  language,
  translation,
  translations,
  translationLanguages
}) => {
  return (
    <div className="steps-content">
      <div style={{marginBottom: '10px'}}>
        <b>{labels.formTranslationsBlock[language]}</b>
        <Button
          style={{ marginLeft: "5px" }}
          shape="circle"
          icon="plus"
          size="small"
          onClick={() => handleChangeElement("addTranslation", null, null)}
        />
      </div>
      <Row>
        <TranslationsList
          handleChangeElement={handleChangeElement}
          id={id}
          labels={labels}
          language={language}
          translations={translations}
        />
        {translationLanguages.length || (!translationLanguages.length && translation.index !== null && translation.lang !== null) ? (
          <Form
            data={translation}
            handleUpdate={handleUpdate}
            labels={labels}
            language={language}
            languages={translationLanguages}
            type="translation"
          />
        ) : null}
      </Row>
    </div>
  );
};

StepTwo.propTypes = {
  handleChangeElement: func.isRequired,
  handleUpdate: func.isRequired,
  id: string,
  labels: object.isRequired,
  language: string.isRequired,
  translation: object,
  translations: object,
  translationLanguages: array.isRequired
};
