import React, { useContext } from "react";
import { Flag, Grid, List } from "semantic-ui-react";

import { MenuSelectionContext } from "./MenuBar";
import SelectionLabel from "./SelectionLabel";
import { capitalizeFirstLetter } from "../../utils/functions";

const styles = {
  listItemStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
    flexDirection: "column",
  },
  selectionsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "left",
  },
};

function SelectionItem({ selection }) {
  const { localSelection, setLocalSelection } = useContext(
    MenuSelectionContext
  );

  function selectionIsArray() {
    return Array.isArray(localSelection[selection]);
  }

  function handleDeleteLabel(e, result) {
    setLocalSelection({ ...localSelection, [result.selection]: "" });
  }

  function handleDeleteSourcesLabel(e, result) {
    const filterLocalSelection = localSelection.sources.filter(
      (source) => source !== result.id
    );
    setLocalSelection({ ...localSelection, sources: filterLocalSelection });
  }

  return (
    <List.Item as={Grid} divided style={styles.listItemStyle}>
      <div>{capitalizeFirstLetter(selection)}:</div>
      <div style={styles.selectionsContainer}>
        {selectionIsArray() ? (
          localSelection[selection].map((item) => {
            return (
              <SelectionLabel
                key={item}
                item={item}
                onDelete={handleDeleteSourcesLabel}
              />
            );
          })
        ) : (
          <>
            <SelectionLabel
              key={localSelection[selection]}
              item={localSelection[selection]}
              flag={true}
              selection={selection}
              onDelete={handleDeleteLabel}
            ></SelectionLabel>
          </>
        )}
      </div>
    </List.Item>
  );
}

export default SelectionItem;
