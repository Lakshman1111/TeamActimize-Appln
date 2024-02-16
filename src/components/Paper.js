import React from "react";
import { Paper } from "@mui/material/";
const ReusablePaper = (props) => {
  return (
    <>
      <Paper
        sx={{
          padding: "10px",
          mb: 2,
          mt: 2,
          boxShadow: "0px 10px 80px rgba(0, 0, 0, 0.1)",
          bgcolor: "#fff",
          borderRadius: "10px",
          ...props.sx,
        }}
          >
              {props.children}
      </Paper>
    </>
  );
};
export default ReusablePaper;