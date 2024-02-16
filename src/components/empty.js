import React from 'react';
import {Button} from '@mui/material/';
import Navbar from './Navbar';
const ReuseableButton = (props) => {
   let buttonVariant = props.buttonVariant;
   let buttonColor = props.buttonColor;
   let buttonText = props.buttonText;
  return (
    <>
      {/* <Button
        type={props.buttonType}
        size={props.buttonSize}
        variant={!buttonVariant ? "contained" : buttonVariant}
        color={!buttonColor ? "info" : buttonColor}
        sx={{
          textTransform: "none",
          borderRadius: "20px",
          boxShadow: "0px 10px 80px rgba(0, 0, 0, 0.1)",
          ...props.sx,
        }}
        startIcon={props.startIcon}
        onClick={props.onClick}
      >
        {!buttonText ? "Add" : buttonText}
      </Button> */}
      <Navbar/>
    </>
  );
};
export default ReuseableButton;