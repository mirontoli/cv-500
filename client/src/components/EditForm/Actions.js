import React from "react";
import { func, number } from "prop-types";
import { Button, message } from "antd";

export const Actions = ({ current, next, prev, total }) => {
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
          onClick={() => message.success("Processing complete!")}
        >
          Done
        </Button>
      )}
    </div>
  );
};

Actions.propTypes = {
  current: number.isRequired,
  next: func.isRequired,
  prev: func.isRequired,
  total: number.isRequired
};
