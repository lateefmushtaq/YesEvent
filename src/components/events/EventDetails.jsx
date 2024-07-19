import { Col, Row, ListGroup, Container, Card } from "react-bootstrap";
import img from "../assets/bg.webp";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const style = {
  backgroundColor: "#e3f6e9",
  color: "#1a5319",
};

const cardStyle = {
  backgroundColor: "#e3f6e9",
  color: "#1a5319",
  border: "2px solid #508d4e",
};

function EventDetails() {
  const { id } = useParams();
  const [localEventData, setLocalEventData] = useState(null);

  useEffect(() => {
    const storedEventData = localStorage.getItem("cards");
    if (storedEventData) {
      setLocalEventData(JSON.parse(storedEventData));
    } else {
      setLocalEventData([]);
    }
  }, []);

  useEffect(() => {}, [id, localEventData]);

  if (localEventData === null) {
    return <p>Loading...</p>;
  }

  const item = localEventData.find((event) => event.id.toString() === id);

  if (!item) {
    return <p>Event not found</p>;
  }

  return (
    <Container fluid>
      <Row md={1} style={{ justifyContent: "center" }}>
        <Col className="mt-2" sm={12} md={4}>
          <Card style={cardStyle}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title>
                <span>{item.name}</span>
              </Card.Title>
              <ListGroup>
                <ListGroup.Item style={style}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: "#1a5319", marginRight: "4px" }}
                  />
                  {item.date}
                </ListGroup.Item>
                <ListGroup.Item style={style}>
                  <strong>Event ID: </strong>
                  {id}
                </ListGroup.Item>
                <ListGroup.Item style={style}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#1a5319", marginRight: "4px" }}
                  />
                  {item.venue}
                </ListGroup.Item>
                <ListGroup.Item style={style}>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ color: "#1a5319", marginRight: "4px" }}
                  />
                  {item.description}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetails;
