import React from "react";
import { func, object, string } from "prop-types";
import { Button, Card, Col } from "antd";

export const TranslationsList = ({
  labels,
  language,
  translations,
  handleChangeElement,
  id
}) => {
  return (
    <Col span={12}>
      <Card className="exampleCard">
        {Object.keys(translations).length ? (
          <ul>
            {Object.keys(translations).map((el, num) => {
              return (
                <li key={id + "-" + num}>
                  <b>{el}:</b> {translations[el]}
                  <Button
                    style={{ marginLeft: "5px" }}
                    shape="circle"
                    icon="edit"
                    size="small"
                    onClick={() => handleChangeElement("editTraslation", null, el)}
                  />
                  <Button
                    style={{ marginLeft: "5px" }}
                    shape="circle"
                    icon="minus-circle-o"
                    size="small"
                    onClick={() =>
                      handleChangeElement("deleteTranslation", null, el)
                    }
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <i>{labels.translationsListEmpty[language]}</i>
        )}
      </Card>
    </Col>
  );
};

TranslationsList.propTypes = {
  labels: object.isRequired,
  language: string.isRequired,
  handleChangeElement: func.isRequired,
  id: string.isRequired,
  translations: object.isRequired
};
