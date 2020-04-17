import React from "react";

import { Icon, Label, Flag } from "semantic-ui-react";

function SelectionLabel({ flag, item, onDelete, selection }) {
  return (
    <Label
      as="a"
      size="tiny"
      color="black"
      style={{ display: "flex", justifyContent: "space-evenly" }}
    >
      {item.toUpperCase() + " "}
      {flag && <Flag name={item} />}
      <Icon
        id={item}
        name="delete"
        color="yellow"
        onClick={onDelete}
        selection={selection}
      />
    </Label>
  );
}
export default SelectionLabel;
