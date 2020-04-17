import React from "react";
import { Header } from "semantic-ui-react";

const Logo = ({ attached }) => {
  return (
    <Header
      as="h3"
      attached={attached}
      textAlign="right"
      style={
        attached === "bottom"
          ? { marginBottom: 60, marginTop: 20 }
          : { marginBottom: 20, marginTop: 20 }
      }
    >
      <a href="https://newsapi.org/" target="_blank">
        Check News API
      </a>
    </Header>
  );
};

export default Logo;
