import React from "react";
import { array, func, object, string } from "prop-types";
import { Button, Card, Col } from "antd";

export const ExamplesList = ({
  exampleId,
  examples,
  handleChangeElement,
  id,
  labels,
  language
}) => {
  return (
    <Col span={12}>
      {examples.length ? (
        examples.map((item, i) => {
          return (
            <Card
              key={id + "-" + i}
              className={
                exampleId !== i.toString()
                  ? "exampleCard"
                  : "exampleCard exampleCardSelected"
              }
            >
              <b>{item.cv}</b>
              <Button
                style={{ marginLeft: "5px" }}
                shape="circle"
                icon="plus"
                size="small"
                onClick={() =>
                  handleChangeElement("addExampleElement", i, null)
                }
              />
              <Button
                style={{ marginLeft: "5px" }}
                shape="circle"
                icon="edit"
                size="small"
                onClick={() => handleChangeElement("editExample", i, "cv")}
              />
              <Button
                style={{ marginLeft: "5px" }}
                shape="circle"
                icon="minus-circle-o"
                size="small"
                onClick={() => handleChangeElement("deleteExample", i, null)}
              />
              {Object.keys(item).length > 1 ? (
                <ul>
                  {Object.keys(item).map((el, num) => {
                    return (
                      el !== "cv" && (
                        <li key={id + "-" + i + "-" + num}>
                          <b>{el}:</b> {item[el]}
                          <Button
                            style={{ marginLeft: "5px" }}
                            shape="circle"
                            icon="edit"
                            size="small"
                            onClick={() =>
                              handleChangeElement("editExampleElement", i, el)
                            }
                          />
                          <Button
                            style={{ marginLeft: "5px" }}
                            shape="circle"
                            icon="minus-circle-o"
                            size="small"
                            onClick={() =>
                              handleChangeElement("deleteExampleElement", i, el)
                            }
                          />
                        </li>
                      )
                    );
                  })}
                </ul>
              ) : null}
            </Card>
          );
        })
      ) : (
        <Card className="exampleCard">
          <i>{labels.examplesListEmpty[language]}</i>
        </Card>
      )}
    </Col>
  );
};

ExamplesList.propTypes = {
  exampleId: string,
  examples: array.isRequired,
  handleChangeElement: func.isRequired,
  id: string.isRequired,
  labels: object.isRequired,
  language: string.isRequired
};
