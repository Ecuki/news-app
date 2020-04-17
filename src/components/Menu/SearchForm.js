import React, { useContext } from "react";
import { SelectionContext } from "../../App";
import { MenuSelectionContext } from "./MenuBar";

import { Icon, Form } from "semantic-ui-react";
export default function SearchForm() {
  const { setSelection } = useContext(SelectionContext);
  const { localSelection } = useContext(MenuSelectionContext);
  function handleSearch(e, result) {
    e.preventDefault();
    setSelection({ ...localSelection, query: e.target.query.value });
    console.log(localSelection);
    e.target.query.value = "";
  }
  return (
    <Form fluid inverted onSubmit={handleSearch}>
      <Form.Input
        id="query"
        fluid
        placeholder="Search..."
        style={{ marginBottom: 10 }}
      />
      <Form.Button type="submit" aria-label="Search" positive fluid>
        <Icon name="search" />
        Search
      </Form.Button>
    </Form>
  );
}
