import React from "react";
import { Card, CardImg, CardTitle, CardDeck, CardBody } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";

const Gallery = props => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ paddingTop: "20px" }}>{props.name}</h3>
      <CardDeck style={{ display: "flex", justifyContent: "center" }}>
        {props.list.map((itm, i) => (
          <Card key={i} style={{ width: "200px", margin: "2%"}}>
            <CardImg
                // onClick={props.clickHandler ? () => props.clickHandler(itm) : null}
              top
              width="100%"
              src="https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{itm.title}</CardTitle>
            </CardBody>
              <DeleteIcon style={{cursor: "pointer"}} onClick={props.removeHandler ? () => props.removeHandler(itm) : null} />
          </Card>

        ))}
      </CardDeck>
    </div>
  );
};

export default Gallery;
