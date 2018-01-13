import React from "react";
import { func, object, string } from "prop-types";
import { Input } from "antd";

export const StepOne = ({
  audio,
  handleChange,
  labels,
  language,
  term,
  transcription
}) => {
  return (
    <div className="steps-content">
      <b>{labels.formTermField[language]}</b>
      <Input
        style={{ margin: "10px 0" }}
        value={term}
        onChange={e => handleChange(e.target.value, "term")}
      />
      <b>{labels.formTranscriptionField[language]}</b>
      <Input
        style={{ margin: "10px 0" }}
        value={transcription}
        onChange={e => handleChange(e.target.value, "transcription")}
      />
      <b>{labels.formAudioField[language]}</b>
      <Input
        style={{ margin: "10px 0" }}
        value={audio}
        onChange={e => handleChange(e.target.value, "audio")}
      />
    </div>
  );
};

StepOne.propTypes = {
  audio: string,
  handleChange: func.isRequired,
  labels: object.isRequired,
  language: string.isRequired,
  term: string,
  transcription: string
};
