import React from "react";
import { Button } from "semantic-ui-react";

const buttonStyle = {
  marginTop: 10,
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "start",
};

const SelectButton = ({ text, children, click, id }) => {
  return (
    <Button
      id={id}
      name={text}
      basic
      inverted
      fluid
      style={buttonStyle}
      onClick={click}
    >
      {text.toUpperCase()} {children}
    </Button>
  );
};

export default SelectButton;
