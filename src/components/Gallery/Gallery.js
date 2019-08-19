import React from "react";
import { CardDeck } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Gallery = props => {
  console.log(props.list);
  return (
    <div style={{ marginTop: "20px" }}>
    <CardDeck style={{ display: "flex", justifyContent: "center" }}>
      {props.list.map((itm, i) => (
          <Card style={{width: "20%", maxWidth: "300px", margin: "2%", cursor: "pointer"}}>
            <CardContent onClick={props.clickHandler ? () => props.clickHandler(itm) : null}>
              <Typography color="textSecondary" gutterBottom>
                {itm.author}
              </Typography>
              <Typography variant="h5" component="h2">
              {itm.title}
              </Typography>
              <Typography color="textSecondary">
                Novel
              </Typography>
              <Typography variant="body2" component="p" style={{color: "black"}}>
                {itm.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{itm.modified}</Button>
            </CardActions>
            <DeleteIcon style={{cursor: "pointer"}} onClick={props.removeHandler ? () => props.removeHandler(itm) : null} />
          </Card>
      ))}
    </CardDeck>
    
      {/* <h3 style={{ paddingTop: "20px" }}>{props.name}</h3>
      <CardDeck style={{ display: "flex", justifyContent: "center" }}>
        {props.list.map((itm, i) => (
          <Card key={i} style={{ width: "200px", margin: "2%"}}>
            <CardImg
                style={{cursor: "pointer"}}
                onClick={props.clickHandler ? () => props.clickHandler(itm) : null}
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
      </CardDeck> */}
    </div>
  );
};

export default Gallery;
