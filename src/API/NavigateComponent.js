import React, { useEffect } from "react";
import API from "./API";
import { useNavigate } from "react-router-dom";

function NavigateComponent() {
  const navigate = useNavigate();
  navigate('/home');
  return (
    // JSX for your component goes here
    <>
    </>
  );
}

export default NavigateComponent;
