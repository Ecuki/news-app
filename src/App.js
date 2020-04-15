import React, { useState, useEffect } from "react";
import { useAsync } from "react-async-hook";
import { useSpring, animated } from "react-spring";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, List, Container, Menu, Grid } from "semantic-ui-react";

import { API_KEY } from "./config";
import Article from "./components/Article";
import MenuBar from "./components/MenuBar";

const fetchNews = async (sources) => {
  const category = sources.category ? `category=${category}&` : "";
  const language = sources.language ? `language=${language}&` : "language=en&";
  const country = sources.country ? `country=${country}&` : "";
  const query = sources.query ? `q=${query}&` : "";
  const url =
    "http://newsapi.org/v2/top-headlines?" +
    category +
    language +
    country +
    query +
    `apiKey=${API_KEY}`;

  return (await fetch(url)).json();
};

function App() {
  const id = 1;
  const { loading, error, result } = useAsync(fetchNews, [id]);

  const [articles, setArticles] = useState([]);
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  useEffect(() => {
    result && setArticles(result.articles);
    console.log(result?.articles);
  }, [result]);

  const [state, setState] = useState({
    todo: "",
    todos: ["item 1", "item 2", "item 3"].map((text, id) => ({ id, text })),
  });

  state.id = state.todos.length;

  function add(event) {
    event.preventDefault();

    setState({
      id: state.id + 1,
      todos: [...state.todos, { id: state.id, text: state.todo || "-" }],
      todo: "",
    });
  }
  function remove(event) {
    setState({
      ...state,
      todos: state.todos.filter(
        (item) => item.id !== +event.currentTarget.getAttribute("data-id")
      ),
    });
  }
  function handleChange({ target: { name, value } }) {
    setState({ ...state, [name]: value });
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <MenuBar />
      <Container>
        {" "}
        <animated.div style={props}>
          <List relaxed>
            {articles &&
              articles.map((item) => (
                // The next line is what controls
                // animated transitions

                <List.Item>
                  <Article item={item} remove={remove} />
                </List.Item>
              ))}
          </List>
        </animated.div>
        <Form
          onSubmit={state.todo !== "" && add}
          autoComplete="off"
          loading={loading}
        >
          <div className="col-10">
            <div className="input-group mt-4 mb-1">
              <input
                type="text"
                className="form-control"
                id="todoField"
                placeholder="Todo item"
                name="todo"
                value={state.todo}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <Button
                  onClick={state.todo !== "" && add}
                  className="btn btn-outline-success"
                  type="button"
                >
                  Add Item
                </Button>
              </div>
            </div>
            <small id="emailHelp" className="form-text text-muted">
              Item Count: {state.todos.length}
            </small>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default App;
