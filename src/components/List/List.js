import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const List = props => {
        return (
            <div style={{ backgroundColor: "#1f2251", color: "hsla(0,0%,100%,.8)", width: "40%", marginTop: "20px"}}>
                <h3 style={{paddingTop: "20px"}}>{props.name}</h3>
                <ListGroup flush>
                    {
                        props.list.map((itm, i) => (
                            <ListGroupItem key={i} disabled tag="a" href="#">{itm.name}</ListGroupItem>
                        ))
                    }
                </ListGroup>
            </div>
        );
}

export default List;