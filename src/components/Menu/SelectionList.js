import React, { useContext } from "react";

import { List } from "semantic-ui-react";

import { MenuSelectionContext } from "./MenuBar";
import SelectionItem from "./SelectionItem";

function SelectionList() {
  const { localSelection } = useContext(MenuSelectionContext);

  function checkSelectionIsEmpty(selection) {
    return (
      localSelection[selection] === "" || localSelection[selection].length === 0
    );
  }

  return (
    <List inverted style={{ padding: 10 }}>
      {Object.keys(localSelection).map(
        (selection) =>
          !checkSelectionIsEmpty(selection) && (
            <SelectionItem selection={selection} />
          )
      )}
    </List>
  );
}

export default SelectionList;
