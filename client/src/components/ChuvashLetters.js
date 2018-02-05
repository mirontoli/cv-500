import React from "react";
import { func } from "prop-types";
import { Button } from "antd";

const ButtonGroup = Button.Group;

export const ChuvashLetters = ({ handleBtnClick }) => {
  return (
    <ButtonGroup>
      <Button onClick={() => handleBtnClick("ӑ")}>ă</Button>
      <Button onClick={() => handleBtnClick("ӗ")}>ĕ</Button>
      <Button onClick={() => handleBtnClick("ҫ")}>ç</Button>
      <Button onClick={() => handleBtnClick("ӳ")}>ÿ</Button>
    </ButtonGroup>
  );
};

ChuvashLetters.propTypes = {
  handleBtnClick: func.isRequired
};
