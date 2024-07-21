import { Col, Row, Stack, Container, Card } from "react-bootstrap";
import img from "../assets/bg.webp";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

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

  const iconStyle = {
    color: "#1a5319",
    marginRight: "8px",
  };

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center text-center mb-4">
        <Col sm={12} md={10}>
          <Image
            style={{ width: "100%", maxHeight: "30vh", objectFit: "cover" }}
            src={img}
            fluid
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12} md={8}>
          <Card
            style={{
              backgroundColor: "#d4edda",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Header as="h5" style={{ textAlign: "center" }}>
              {item.name}
            </Card.Header>
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Stack
                direction="horizontal"
                gap={3}
                className="justify-content-center"
              >
                <div
                  className="p-2"
                  style={{ backgroundColor: "#1a5319", color: "#fff" }}
                >
                  {item.eventType}
                </div>
                <div className="p-2">
                  <FontAwesomeIcon icon={faLocationDot} style={iconStyle} />{" "}
                  {item.location}
                </div>
                <div className="p-2">
                  <FontAwesomeIcon icon={faCalendarDays} style={iconStyle} />{" "}
                  {item.date}
                </div>
                <div className="p-2">
                  <FontAwesomeIcon icon={faClock} style={iconStyle} />{" "}
                  {item.time}
                </div>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetails;
