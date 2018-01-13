import React from "react";
import { array, func, object, string } from "prop-types";
import { Row } from "antd";
import { AddExampleForm } from "./AddExampleForm";
import { ExamplesList } from "./ExamplesList";

export const StepThree = ({example, example_languages, examples, handleChangeElement, handleUpdate, id, labels, language, languages}) => {
  return (
    <div className="steps-content">
      <b>{labels.formExamplesBlock[language]}</b>
      <Row>
        <ExamplesList
          id={id}
          exampleId={example.index}
          examples={examples}
          handleChangeElement={handleChangeElement}
        />
        <AddExampleForm
          example={example}
          labels={labels}
          language={language}
          languages={example_languages}
          handleUpdate={handleUpdate}
        />
      </Row>
    </div>
  );
};

StepThree.propTypes = {
    example: object, 
    example_languages: array, 
    examples: array, 
    handleChangeElement: func.isRequired, 
    handleUpdate: func.isRequired, 
    id: string, 
    labels: object.isRequired, 
    language: string.isRequired,
    languages: array,
}