import { Col, Row, ListGroup, Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../contextProvider/AuthProvider";
import img from "../assets/bg.webp";
import { Button } from "../buttons/CreateEventButton";
import { useNavigate } from "react-router-dom";

import {
  faLocationDot,
  faClock,
  faSpinner,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
const style = {
  backgroundColor: "#e3f6e9",
  color: " #1a5319",
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
};
const cardStyle = {
  backgroundColor: "#e3f6e9",
  color: " #1a5319",
  border: "2px solid #508d4e",
};

function Events() {
  const { eventData, setEventData } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  function handleDelete(id) {
    const updatedEvents = eventData.filter((item) => item.id !== id);
    setEventData(updatedEvents);
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          height: "50vh",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          style={{ fontSize: "50px", color: "#1a5319" }}
          icon={faSpinner}
          spin
          spinReverse
        />
      </div>
    );

  return (
    <Container className="mt-4">
      <Row md={1} style={{ justifyContent: "center" }}>
        {eventData &&
          eventData.map((item) => (
            <Col className="mt-2" key={item.id} sm={12} md={4}>
              <Card style={cardStyle}>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                  <Card.Title>
                    <span> {item.name}</span>
                  </Card.Title>

                  <ListGroup>
                    <ListGroup.Item style={style}>
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{ color: "#1a5319", marginRight: "8px" }}
                      />
                      {item.date ? formatDate(item.date) : "Not Specified"}
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{
                          color: "#1a5319",
                          marginRight: "8px",
                          marginLeft: "12px",
                        }}
                      />
                      {item.time ? item.time : "Not Specified"}
                    </ListGroup.Item>

                    <ListGroup.Item style={style}>
                      <p>
                        {" "}
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          style={{ color: "#1a5319", marginRight: "4px" }}
                        />{" "}
                        {item.venue},
                      </p>
                      <p style={{ marginLeft: "4px" }}> {item.location}</p>
                    </ListGroup.Item>

                    {item.eventType ? (
                      <ListGroup.Item style={style}>
                        {item.eventType}
                      </ListGroup.Item>
                    ) : (
                      ""
                    )}

                    <ListGroup.Item style={style}>
                      {item.description.substring(0, 80) + "......"}
                    </ListGroup.Item>
                  </ListGroup>

                  <Card.Text>{}</Card.Text>
                  <Card.Body>
                    <Button
                      onClick={() => navigate(`/eventDetails/${item.id}`)}
                      variant="success"
                      coloronhover="#508d4e"
                      backgroundcolor="#80af81"
                      bordercolor={"#508d4e"}
                      width="100%"
                    >
                      {" "}
                      Event Details
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="danger"
                      width="100%"
                      marginTop="24px"
                    >
                      {" "}
                      Delete Event
                    </Button>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Events;
