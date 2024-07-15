import Card from "react-bootstrap/Card";
import { useContext, useState } from "react";
import AuthContext from "../contextProvider/AuthProvider";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";
import img from "../assets/bg.webp";
import { Link } from "react-router-dom";
function Events() {
  const { eventData, setEventData } = useContext(AuthContext);
  const [animatingId, setAnimatingId] = useState(null);
  console.log("Here", eventData);

  function handleDelete(id) {
    const updatedData = eventData.filter((item) => item.id !== id);
    setEventData(updatedData);
  }
  function handleFocus(id) {
    setAnimatingId(id);
    setTimeout(() => {
      setAnimatingId(null);
    }, 1500);
  }

  return (
    <Row xs={1} md={3} className="g-4" style={{ marginTop: "20px" }}>
      {eventData.map((item) => (
        <Col key={item.data.id}>
          <Card style={{ width: "18rem", overflow: "hidden" }}>
            <Card.Img
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
              variant="top"
              src={img}
            />
            <Card.Body>
              <Card.Title>{item.data.attributes.name}</Card.Title>

              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  {" "}
                  <strong>Event Type:</strong> {item.eventType}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <strong>Event Topic:</strong> {item.topic}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <strong>Venue Type:</strong>
                  {item.venueType}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <strong>Venue Details:</strong>
                  {item.data.attributes["location-name"]}
                </ListGroup.Item>
              </ListGroup>

              <Card.Text>{item.data.attributes.description}</Card.Text>
              <Card.Body>
                <Card.Link as={Link} to={"/eventDetails"}>
                  {" "}
                  Event Details
                </Card.Link>
                <Card.Link>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#ee4e4e", cursor: "pointer" }}
                    onClick={() => handleDelete(item.id)}
                    onMouseEnter={() => handleFocus(item.id)}
                    beatFade={animatingId === item.id}
                  />
                </Card.Link>
              </Card.Body>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Events;
