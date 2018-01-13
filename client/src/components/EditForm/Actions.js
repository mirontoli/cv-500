import React from "react";
import { func, number } from "prop-types";
import { Button } from "antd";

export const Actions = ({ current, done, next, prev, total }) => {
  return (
    <div className="step-actions">
      {current > 0 && (
        <Button style={{ float: "left" }} type="primary" onClick={() => prev()}>
          Previous
        </Button>
      )}
      {current < total - 1 && (
        <Button
          style={{ float: "right" }}
          type="primary"
          onClick={() => next()}
        >
          Next
        </Button>
      )}
      {current === total - 1 && (
        <Button
          style={{ float: "right" }}
          type="primary"
          onClick={() => done()}
        >
          Done
        </Button>
      )}
    </div>
  );
};

Actions.propTypes = {
  current: number.isRequired,
  done: func.isRequired,
  next: func.isRequired,
  prev: func.isRequired,
  total: number.isRequired
};
