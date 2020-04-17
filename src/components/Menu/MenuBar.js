import React, { useState, createContext } from "react";

//Styles
import { Menu } from "semantic-ui-react";
import "./menu.css";

//Components
import Accordions from "./Accordions";
import { initialSelect } from "../../utils/constans";
import SelectionList from "./SelectionList";
import SearchForm from "./SearchForm";

export const MenuSelectionContext = createContext();
//utils

const MenuBar = () => {
  const [localSelection, setLocalSelection] = useState(initialSelect);

  return (
    <Menu vertical fixed="top" className="menuBar" inverted>
      <MenuSelectionContext.Provider
        value={{ localSelection, setLocalSelection }}
      >
        <Accordions />
        <SelectionList />
        <SearchForm />
      </MenuSelectionContext.Provider>
    </Menu>
  );
};

export default MenuBar;
