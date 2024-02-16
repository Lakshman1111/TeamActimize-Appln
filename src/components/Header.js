import React from 'react'
import {Typography } from '@mui/material/';
const ResuableHeaderTypo = (props) => {
  let typographyComponent = props.typographyComponent;
  let typographyVariant = props.typographyVariant;
  return (
    <>
      <Typography
        color
        component={!typographyComponent ? "span" : typographyComponent}
        variant={!typographyVariant ? "h6" : typographyVariant}
        sx={{
          fontSize: "23px",
          mt: 0.5,
          ml: 2,
          ...props.sx,
        }}
      >
        {props.typographyText}
      </Typography>
    </>
  );
};
export default ResuableHeaderTypo;