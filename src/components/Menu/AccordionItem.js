import React, { useContext } from "react";

import { Icon, Accordion, Button, Label, Flag } from "semantic-ui-react";
import { AccordionContext } from "./Accordions";
import { MenuSelectionContext } from "./MenuBar";
import SelectionButton from "./SelectionButton";

import { capitalizeFirstLetter } from "../../utils/functions";

const accordionTitleStyle = {
  marginTop: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

function AccordionItem({ accordion, sourcesNumber, data }) {
  const { activeAccordion, setActiveAccordion } = useContext(AccordionContext);
  const { localSelection, setLocalSelection } = useContext(
    MenuSelectionContext
  );

  function handleTitleClick(e, result) {
    if (result.index === activeAccordion) {
      setActiveAccordion(0);
    } else {
      setActiveAccordion(result.index);
    }
  }

  function handleAccordionItemClick(e, result) {
    e.preventDefault();
    let state;
    if (
      result.id === "sources" &&
      !localSelection[result.id].includes(result.name)
    ) {
      state = {
        ...localSelection,
        [result.id]: [...localSelection[result.id], result.name],
      };
    } else if (localSelection[result.id].includes(result.name)) {
      state = localSelection;
    } else if (result.name !== "all") {
      state = { ...localSelection, [result.id]: result.name };
    } else {
      state = { ...localSelection, [result.id]: "" };
    }
    setLocalSelection(state);
    setActiveAccordion(0);
  }

  function mutuallyExclusiveSelections(acc) {
    if (
      acc.category === "sources" &&
      (localSelection.category !== "" || localSelection.country !== "")
    ) {
      return true;
    } else if (
      (acc.category === "category" || acc.category === "country") &&
      localSelection.sources.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <Accordion.Title
        active={activeAccordion === accordion.index}
        index={accordion.index}
        as={Button}
        onClick={handleTitleClick}
        fluid
        inverted
        style={accordionTitleStyle}
        disabled={mutuallyExclusiveSelections(accordion)}
      >
        <Icon name="dropdown" />
        {capitalizeFirstLetter(accordion.category) + "?"}
        <Label color="red" size="tiny">
          {sourcesNumber}
        </Label>
      </Accordion.Title>

      <Accordion.Content active={activeAccordion === accordion.index}>
        {data.map((item) => {
          // console.log(item);
          // console.log(item?.id ?? item + Object.keys(data)[accordion.category]);
          return (
            <SelectionButton
              id={accordion.category}
              text={item?.id ?? item}
              key={item?.id ?? item + Object.keys(data)[accordion.index]}
              click={handleAccordionItemClick}
            >
              {accordion.isFlag && <Flag name={item} />}
            </SelectionButton>
          );
        })}
      </Accordion.Content>
    </>
  );
}
export default AccordionItem;
