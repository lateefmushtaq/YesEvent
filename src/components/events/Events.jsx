import Card from "react-bootstrap/Card";
import { useContext, useState } from "react";
import AuthContext from "../contextProvider/AuthProvider";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

function Events() {
  const { eventData, setEventData } = useContext(AuthContext);
  const [animatingId, setAnimatingId] = useState(null);

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
        <Col key={item.id}>
          <Card style={{ width: "18rem", overflow: "hidden" }}>
            <Card.Img
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
              variant="top"
              src={item.fileData ? item.fileData.name : ""}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <p>{item.eventType}</p>
              <p>{item.venueType}</p>
              <p>{item.venueData}</p>
              <p>{item.topic}</p>
              <Card.Text>{item.description}</Card.Text>
              <Button
                coloronhover="#80af81"
                backgroundcolor="#fff"
                color="#508d4e"
              >
                {" "}
                Book
              </Button>
              <Button>
                {" "}
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "#ee4e4e", cursor: "pointer" }}
                  onClick={() => handleDelete(item.id)}
                  onMouseEnter={() => handleFocus(item.id)}
                  beatFade={animatingId === item.id}
                />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Events;
