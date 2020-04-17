import React, { useState, useEffect, createContext } from "react";
import { useAsync } from "react-async-hook";
import { useSpring, animated } from "react-spring";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import {
  List,
  Container,
  Segment,
  Dimmer,
  Loader,
  Icon,
  Header,
  Button,
  Divider,
  Pagination,
} from "semantic-ui-react";

import { API_KEY } from "./config";
import Article from "./components/Article";
import MenuBar from "./components/Menu";
import { initialSelect } from "./utils/constans";

export const SelectionContext = createContext();

function getArticlesUrl(sources) {
  console.log(sources);
  const sourcesString =
    sources.sources.length !== 0
      ? `sources=${sources.sources.toString()}&`
      : "";
  const category = sources.category ? `category=${sources.category}&` : "";
  const language = sources.language
    ? `language=${sources.language}&`
    : sources.sources.length !== 0
    ? ""
    : "language=en&";
  const country = sources.country ? `country=${sources.country}&` : "";
  const query = sources.query ? `q=${sources.query}&` : "";

  if (sources.sources.length === 0) {
    return `http://newsapi.org/v2/top-headlines?${category +
      language +
      country +
      query}apiKey=${API_KEY}`;
  } else {
    return `http://newsapi.org/v2/everything?${sourcesString +
      language +
      query}apiKey=${API_KEY}`;
  }
}
function getAllSourcesUrl() {
  return `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;
}

const fetchNews = async (url) => {
  return (await fetch(url)).json();
};

function App() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [selected, setSelection] = useState(initialSelect);
  const { loading: loadingNews, error: errorNews, result: newsData } = useAsync(
    fetchNews,
    [getArticlesUrl(selected)]
  );

  const {
    loading: loadingSources,
    error: errorSources,
    result: sourcesData,
  } = useAsync(fetchNews, [getAllSourcesUrl()]);

  useEffect(() => {
    newsData && setArticles(newsData.articles);
  }, [newsData]);

  useEffect(() => {
    sourcesData && setSources(sourcesData.sources);
  }, [sourcesData]);

  if (errorNews) return <div>Error: {errorNews.message}</div>;
  return (
    <SelectionContext.Provider value={{ selected, setSelection, sources }}>
      <MenuBar />
      <Container>
        <Header
          as="h2"
          attached="top"
          textAlign="right"
          style={{ marginBottom: 20 }}
        >
          News
        </Header>
        <animated.div style={props}>
          {loadingNews ? (
            <Segment
              style={{ height: "100vh", width: "100vw" }}
              textAlign="center"
            >
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            </Segment>
          ) : articles.length === 0 ? (
            <Segment placeholder style={{ height: "100vh" }}>
              <Header icon>
                Sorry
                <Divider />
                <Icon name="pdf file outline" />
                <Divider />
                No results for this search.
              </Header>
            </Segment>
          ) : (
            <List relaxed>
              {articles &&
                articles.map((item) => (
                  <List.Item key={item.publishedAt}>
                    <Article item={item} />
                  </List.Item>
                ))}
            </List>
          )}
        </animated.div>
        <Header
          as="h2"
          attached="bottom"
          textAlign="right"
          style={{ marginTop: 20 }}
        >
          News
        </Header>
      </Container>
    </SelectionContext.Provider>
  );
}
export default App;
