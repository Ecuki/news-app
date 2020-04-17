import React, { useState, useContext, createContext } from "react";

import { Accordion } from "semantic-ui-react";

import { SelectionContext } from "../../App";
import { MenuSelectionContext } from "./MenuBar";
import AccordionItem from "./AccordionItem";

import { data } from "../../data";

export const AccordionContext = createContext();

const accordions = [
  {
    index: "1",
    category: "category",
    isFlag: false,
  },
  {
    index: "2",
    category: "country",
    isFlag: true,
  },
  {
    index: "3",
    category: "language",
    isFlag: true,
  },
];

const sourcesAcordion = {
  index: "4",
  category: "sources",
};

const Accordions = () => {
  const { sources } = useContext(SelectionContext);
  const { localSelection } = useContext(MenuSelectionContext);
  const [activeAccordion, setActiveAccordion] = useState(0);
  function filterSources() {
    return sources.filter(
      (source) =>
        (source.category === localSelection.category ||
          !localSelection.category) &&
        (source.country === localSelection.country ||
          !localSelection.country) &&
        (source.language === localSelection.language ||
          !localSelection.language)
    );
  }

  return (
    <AccordionContext.Provider value={{ activeAccordion, setActiveAccordion }}>
      <Accordion inverted color="black">
        {accordions.map((accordion) => (
          <AccordionItem
            accordion={accordion}
            sourcesNumber={data[accordion.category].length}
            data={data[accordion.category]}
            key={accordion.index}
          />
        ))}

        <AccordionItem
          accordion={sourcesAcordion}
          sourcesNumber={filterSources(sources).length}
          data={filterSources(sources)}
        />
      </Accordion>
    </AccordionContext.Provider>
  );
};

export default Accordions;
