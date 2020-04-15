import React from "react";
import moment from "moment";
import { Button, Card, Icon, Image, Grid } from "semantic-ui-react";
import ImageCard from "./ImageCard";

export default function Article({ item, remove }) {
  const articleDescription =
    item.description === "" && item.description !== "Kliknij i zobacz więcej."
      ? item.description
      : item.content;
  // console.log(articleDescription.split("[")[0]);
  return (
    <Grid relaxed columns={2} centered>
      <Grid.Column verticalAlign="middle" mobile={12} computer={4}>
        <ImageCard link={item.url} url={item.urlToImage} />
      </Grid.Column>
      <Grid.Column verticalAlign="middle" mobile={12} computer={12}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{item.title}</Card.Header>
            <Card.Meta> {item.author}</Card.Meta>
            <Card.Meta>{moment(item.publishedAt).fromNow()}</Card.Meta>
            <Card.Description>
              {articleDescription && articleDescription.split("[")[0]}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a href={item.url}>
              <Icon name="user" />
              See source
            </a>
            <a>
              <Icon name="user" />
              {item.source.name}
            </a>
            <Button
              data-id={item.id}
              onClick={remove}
              type="button"
              className="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </Button>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}
