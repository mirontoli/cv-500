import React from "react";
import { array, func, object, string } from "prop-types";
import { Button, Row } from "antd";
import { ExamplesList } from "./ExamplesList";
import { Form } from "./Form";

export const StepThree = ({
  example,
  exampleLanguages,
  examples,
  handleChangeElement,
  handleUpdate,
  id,
  labels,
  language
}) => {
  return (
    <div className="steps-content">
      <div style={{marginBottom: '10px'}}>
        <b>{labels.formExamplesBlock[language]}</b>
        <Button
          style={{ marginLeft: "5px" }}
          shape="circle"
          icon="plus"
          size="small"
          onClick={() => handleChangeElement("addExample", null, null)}
        />
      </div>
      <Row>
        <ExamplesList
          exampleId={example.index}
          examples={examples}
          handleChangeElement={handleChangeElement}
          id={id}
          labels={labels}
          language={language}
        />
        {exampleLanguages.length || (!exampleLanguages.length && example.index !== null && example.lang !== null) ? (
          <Form
            data={example}
            handleUpdate={handleUpdate}
            labels={labels}
            language={language}
            languages={exampleLanguages}
            type="example"
          />
        ) : null}
      </Row>
    </div>
  );
};

StepThree.propTypes = {
  example: object,
  exampleLanguages: array,
  examples: array,
  handleChangeElement: func.isRequired,
  handleUpdate: func.isRequired,
  id: string,
  labels: object.isRequired,
  language: string.isRequired
};
