import React from "react";
import { InputLabel, Slider as MaterialSlider } from "@material-ui/core";

function Slider({ value, setValue, label, ...rest }) {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <MaterialSlider
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        aria-labelledby="continuous-slider"
        valueLabelDisplay={value === 0 ? undefined : "on"}
        min={0}
        max={5}
        marks
        {...rest}
      />
    </>
  );
}

export default Slider;
