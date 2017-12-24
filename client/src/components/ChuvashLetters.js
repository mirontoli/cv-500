import React from 'react';
import { func } from 'prop-types';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

export const ChuvashLetters = ({ handleBtnClick }) => {
  return (
    <ButtonGroup>
        <Button onClick={() => handleBtnClick('ă')}>ă</Button>
        <Button onClick={() => handleBtnClick('ĕ')}>ĕ</Button>
        <Button onClick={() => handleBtnClick('ç')}>ç</Button>
        <Button onClick={() => handleBtnClick('ÿ')}>ÿ</Button>
    </ButtonGroup>
  )
}

ChuvashLetters.propTypes = {
  handleBtnClick: func.isRequired
}