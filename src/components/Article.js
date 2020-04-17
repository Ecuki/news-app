import React from "react";
import moment from "moment";
import { Card, Icon, Grid } from "semantic-ui-react";
import ImageCard from "./ImageCard";

export default function Article({ item }) {
  const articleDescription =
    item.description !== "" && item.description !== "Kliknij i zobacz więcej."
      ? item.description
      : item.content;
  // console.log(item);

  return (
    <Grid relaxed columns={2} centered>
      <Grid.Column verticalAlign="middle" mobile={12} computer={4}>
        <ImageCard link={item.url} url={item.urlToImage} />
      </Grid.Column>
      <Grid.Column verticalAlign="middle" mobile={12} computer={12}>
        <Card fluid style={{ minWidth: "300px" }}>
          <Card.Content textAlign="left">
            <Card.Header>{item.title}</Card.Header>
            <ArticleAuthor author={item.author} />
            <Card.Meta>{moment(item.publishedAt).fromNow()}</Card.Meta>
            <Card.Description>
              {articleDescription && articleDescription.split("[")[0]}
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <a href={item.url} target="_blank">
              <Icon name="eye" />
              See More
            </a>
            <a>
              <Icon name="world" />
              {item.source.name}
            </a>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

function ArticleAuthor({ author }) {
  if (author?.includes("[{")) {
    JSON.parse(author);
  }

  return <Card.Meta>{author}</Card.Meta>;
}
