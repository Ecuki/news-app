import React, { useState, useEffect } from "react";

import {
  Menu,
  Icon,
  Accordion,
  Button,
  Flag,
  Grid,
  List,
} from "semantic-ui-react";
import { data } from "../data";

const accordionStyle = {
  marginTop: 10,
};
const buttonStyle = {
  marginTop: 10,
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const accordions = [
  {
    index: "0",
    category: "category",
    isFlag: false,
  },
  {
    index: "1",
    category: "country",
    isFlag: true,
  },
  {
    index: "2",
    category: "language",
    isFlag: true,
  },
];
const MenuBar = () => {
  const [activeItem, setActiveItem] = useState(3);
  const [selected, setSelected] = useState({
    category: "",
    language: "en",
    country: "",
    query: "",
  });

  function handleTitleClick(e, result) {
    if (result.index === activeItem) {
      setActiveItem(3);
    } else {
      setActiveItem(result.index);
    }
  }
  function handleButtonClick(e, result) {
    setSelected({ ...selected, [result.id]: result.name });
  }

  return (
    <>
      <Menu
        vertical
        fixed="top"
        style={{ height: "100vh", overflowY: "scroll" }}
        className="menu"
        inverted
      >
        <Accordion inverted color="black">
          {accordions.map((accordion) => (
            <>
              <Accordion.Title
                active={activeItem === accordion.index}
                index={accordion.index}
                as={Button}
                onClick={handleTitleClick}
                fluid
                inverted
                style={accordionStyle}
              >
                <Icon name="dropdown" />
                {`${capitalizeFirstLetter(accordion.category)}?`}
              </Accordion.Title>
              <Accordion.Content active={activeItem === accordion.index}>
                {data[accordion.category].map((item) => (
                  <SelectButton
                    id={accordion.category}
                    text={item}
                    key={`${item + Object.keys(data)[accordion.index]}`}
                    click={handleButtonClick}
                  >
                    {accordion.isFlag && <Flag name={item} />}
                  </SelectButton>
                ))}
              </Accordion.Content>
            </>
          ))}
        </Accordion>
        <List inverted style={{ padding: 10 }}>
          {Object.keys(selected).map(
            (sel) =>
              selected[sel] !== "" && (
                <List.Item as={Grid} divided>
                  <Grid.Column width={6}>{sel}:</Grid.Column>
                  <Grid.Column width={10}>
                    {selected[sel].toUpperCase() + " "}
                    <Flag name={selected[sel]} />
                  </Grid.Column>
                </List.Item>
              )
          )}
        </List>
        <Button positive fluid style={buttonStyle}>
          <Icon name="search" />
          Search
        </Button>
        )
      </Menu>
    </>
  );
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

export default MenuBar;
