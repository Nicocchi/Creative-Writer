import React from "react";
import { Card, CardImg, CardTitle, CardDeck, CardBody } from "reactstrap";

const Gallery = props => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ paddingTop: "20px" }}>{props.name}</h3>
      <CardDeck style={{ display: "flex", justifyContent: "center" }}>
        {props.list.map((itm, i) => (
          <Card key={i} style={{ width: "200px", margin: "2%", cursor: "pointer"}} onClick={props.clickHandler ? () => props.clickHandler(itm.name) : null}>
            <CardImg
              top
              width="100%"
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{itm.name}</CardTitle>
            </CardBody>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
};

export default Gallery;
