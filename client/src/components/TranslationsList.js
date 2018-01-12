import React from "react";
import { array, func, string } from "prop-types";
import { Button, Card, Col } from "antd";

export const TranslationsList = ({ id, translations, handleClick }) => {
  return (
    <Col span={12}>
      <Card>
        {typeof translations === 'object' && Object.keys(translations).length ? (
          <ul>
            {Object.keys(translations).map((el, num) => {
              return (
                <li key={id + "-" + num}>
                  <b>{el}:</b> {translations[el]}
                  <Button
                    style={{ marginLeft: "5px" }}
                    shape="circle"
                    icon="minus-circle-o"
                    size="small"
                    onClick={() => handleClick("delete", null, el)}
                  />
                </li>
              );
            })}
          </ul>
        ) : translations}
      </Card>
    </Col>
  );
};

TranslationsList.propTypes = {
  id: string.isRequired,
  translations: array.isRequired,
  handleClick: func.isRequired
};
