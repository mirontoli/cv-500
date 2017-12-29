import React from "react";
import { array, func, string } from "prop-types";
import { Button, Card, Col } from "antd";

export const ExamplesList = ({ id, exampleId, examples, handleClick }) => {
  return (
    <Col span={12}>
      {examples.length
        ? examples.map((item, i) => {
            return (
              <Card key={id + "-" + i} className={ exampleId !== i.toString() ? 'exampleCard' : 'exampleCard exampleCardSelected'}>
                <b>{item.cv}</b>
                <Button
                  style={{ marginLeft: "5px" }}
                  shape="circle"
                  icon="plus"
                  size="small"
                  onClick={() => handleClick("add", i, null)}
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
                              onClick={() => handleClick("edit", i, el)}
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
        : null}
    </Col>
  );
};

ExamplesList.propTypes = {
  id: string.isRequired,
  exampleId: string,
  examples: array.isRequired,
  handleClick: func.isRequired
};
