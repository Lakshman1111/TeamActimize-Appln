import React from "react";
import { Button } from "@mui/material/";
const ReusebleFormButton = (props) => {
    let buttonVariant = props.buttonVariant;
    let buttonColor = props.buttonColor;
  return (
    <>
      <Button
        variant={!buttonVariant ? "contained" : buttonVariant}
        color={!buttonColor ? "info" : buttonColor}
        type={props.buttonType}
        size={props.buttonSize}
        sx={{
          width: 20,
          height: 35,
          mt: 2,
          textTransform: "none",
          borderRadius: "20px",
          boxShadow: "0px 10px 80px rgba(0, 0, 0, 0.1)",
          ...props.sx,
        }}
        startIcon={props.startIcon}
        onClick={props.onClick}
      >
        {props.buttonText}
      </Button>
    </>
  );
};
export default ReusebleFormButton;