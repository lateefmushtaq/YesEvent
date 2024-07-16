import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contextProvider/AuthProvider";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import img from "../assets/bg.webp";
import { Link } from "react-router-dom";

function Events() {
  const { eventData, setEventData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
          height: "100vh",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          style={{ fontSize: "80px", color: "#1a5319" }}
          icon={faSpinner}
          spin
          spinReverse
        />
      </div>
    );

  return (
    <Row
      xs={1}
      md={3}
      className="g-3"
      style={{ margin: "20px", flexWrap: "wrap" }}
    >
      {eventData &&
        eventData.map((item) => (
          <Col key={item.id}>
            <Card style={{ width: "24rem", overflow: "hidden" }}>
              <Card.Img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                variant="top"
                src={img}
              />
              <Card.Body>
                <Card.Title>
                  <span> {item.name}</span>
                </Card.Title>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{formatDate(item.date)}</ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <strong>Event ID: </strong>
                    {item.id}{" "}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Venue: </strong>
                    {item.venue}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {" "}
                    <strong>Timezone: </strong>
                    {item.description}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Event Owner: </strong>
                    {item.owner}
                  </ListGroup.Item>
                </ListGroup>

                <Card.Text>{}</Card.Text>
                <Card.Body>
                  <Card.Link as={Link} to={"/eventDetails"}>
                    {" "}
                    Event Details
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
