import React from "react";
import { TextField } from "@mui/material/";
const ResuableFormTextField = (props) => {
    let textFieldMargin = props.textFieldMargin;
    let textFieldVariant = props.textFieldVariant;
    let textFieldType = props.textFieldType;
  return (
    <>
      <TextField
        InputProps={{
          disableUnderline: true,
        }}
        fullWidth
        margin={!textFieldMargin ? "dense" : textFieldMargin}
        label={props.textFieldLabel}
        id={props.textFieldName}
        name={props.textFieldName}
        type={!textFieldType ? "text" : textFieldType}
        variant={!textFieldVariant ? "filled" : textFieldVariant}
        value={props.textFieldValue}
        onBlur={props.textFieldOnBlur}
        onChange={props.textFieldOnChange}
        error={props.textFieldError}
        helperText={props.textFieldHelperText}
      >
        {props.children}
      </TextField>
    </>
  );
};
export default ResuableFormTextField;