import React from "react";
import { func, object, string } from "prop-types";
import { Row } from "antd";
import { TranslationsList } from "./TranslationsList";

export const StepTwo = ({
  handleChangeElement,
  handleUpdate,
  id,
  labels,
  language,
  translation
}) => {
  return (
    <div className="steps-content">
      <b>{labels.formTranslationsBlock[language]}</b>
      <Row>
        <TranslationsList
          id={id}
          translations={translation}
          handleChangeElement={handleChangeElement}
        />
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
  translation: object
};
