import React from "react";
import { array, string } from 'prop-types';
import { Button, Col } from 'antd';

export const ExamplesList = ({ id, examples }) => {
  return (
    <Col span={12}>
      {examples.length
        ? examples.map((item, i) => {
            return (
              <div key={id + "-" + i}>
                <b>{item.cv}</b>
                <Button style={{ marginLeft: '5px' }} shape="circle" icon="plus" size="small" />
                {Object.keys(item).length > 1 ? (
                  <ul>
                    {Object.keys(item).map((el, num) => {
                      return (
                        el !== "cv" && (
                          <li key={id + "-" + i + "-" + num}>
                            <b>{el}:</b> {item[el]}
                            <Button style={{ marginLeft: '5px' }} shape="circle" icon="edit" size="small" />
                          </li>
                        )
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })
        : null}
    </Col>
  );
};

ExamplesList.propTypes = {
  id: string.isRequired,
  examples: array.isRequired,
}
