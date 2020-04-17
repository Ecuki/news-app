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
  Divider,
  Pagination,
} from "semantic-ui-react";

import Article from "./components/Article";
import MenuBar from "./components/Menu";
import Logo from "./components/Logo";
import { initialSelect } from "./utils/constans";

// import { API_KEY } from "./config"; //development
const API_KEY = process.env.REACT_APP_API_KEY; //production

const paginationStyle = {
  width: "100vw",
  height: 40,
  position: "fixed",
  bottom: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
};

export const SelectionContext = createContext();
const baseUrl = "https://newsapi.org/v2";
function getArticlesUrl(sources, activePage) {
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
  const page = `page=${activePage}`;
  if (sources.sources.length === 0) {
    return `${baseUrl}/top-headlines?${category +
      language +
      country +
      query +
      page}`;
  } else {
    return `${baseUrl}/everything?${sourcesString + language + query + page}`;
  }
}
function getAllSourcesUrl() {
  return `${baseUrl}/sources?`;
}

const fetchNews = async (url) => {
  return (await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
    },
  })).json();
};

function App() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const articlesPerPage = 20;
  const maxFreeArticles = 100;
  const [activePage, setActivePage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [selected, setSelection] = useState(initialSelect);
  const { loading: loadingNews, error: errorNews, result: newsData } = useAsync(
    fetchNews,
    [getArticlesUrl(selected, activePage)]
  );

  const {
    loading: loadingSources,
    error: errorSources,
    result: sourcesData,
  } = useAsync(fetchNews, [getAllSourcesUrl()]);

  const handlePaginationChange = (e, { activePage }) =>
    setActivePage(activePage);

  useEffect(() => {
    newsData && setArticles(newsData.articles);
  }, [newsData]);

  useEffect(() => {
    sourcesData && setSources(sourcesData.sources);
  }, [sourcesData]);

  if (errorNews) return <div>Error: {errorNews.message}</div>;
  return (
    <SelectionContext.Provider
      value={{ selected, setSelection, sources, setActivePage }}
    >
      <MenuBar />
      <Container>
        <Logo attached="top" />
        <animated.div style={props}>
          {loadingNews ? (
            <Segment
              style={{ height: "100vh", width: "50vw", margin: "0 auto" }}
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
        <Logo attached="bottom" />
        <Pagination
          activePage={activePage}
          onPageChange={handlePaginationChange}
          size="mini"
          boundaryRange={1}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={Math.floor(maxFreeArticles / articlesPerPage)}
          style={paginationStyle}
        />
      </Container>
    </SelectionContext.Provider>
  );
}
export default App;
