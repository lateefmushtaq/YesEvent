import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faSpinner,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Col, Row, ListGroup, Container, Card } from "react-bootstrap";
import { Button } from "../buttons/CreateEventButton";
import img from "../assets/bg.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  backgroundColor: "#e3f6e9",
  color: " #1a5319",
};
const cardStyle = {
  backgroundColor: "#e3f6e9",
  color: " #1a5319",
  border: "2px solid #508d4e",
};

function truncateString(inputString, maxLength) {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength) + "...";
  } else {
    return inputString;
  }
}
function Events() {
  const navigate = useNavigate();
  const [publicEvent, setPublicEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function getData() {
    try {
      const URL = `https://api.eventyay.com/v1/events?cache=true&filter=[{"and":[{"name":"state","op":"eq","val":"published"},{"name":"privacy","op":"eq","val":"public"},{"name":"is-featured","op":"eq","val":true}]},{"or":[{"name":"ends-at","op":"ge","val":"2024-07-16T21:15:15.002Z"}]}]&include=event-topic,event-sub-topic,event-type,speakers-call&page[size]=6&public=true&sort=starts-at`;
      const config = {
        headers: {
          Accept: "application/vnd.api+json",
        },
      };
      let response = await axios.get(URL, config);
      let data = response.data.data;
      setPublicEvents(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

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
  if (error)
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
        {error}
      </div>
    );
  return (
    <Container className="mt-4">
      <Row md={1} style={{ justifyContent: "center" }}>
        {publicEvent &&
          publicEvent.map((item) => (
            <Col className="mt-2" key={item.id} xs={12} md={4}>
              <Card style={cardStyle}>
                <Card.Img
                  style={{ height: "220px" }}
                  variant="top"
                  src={
                    item.attributes["large-image-url"]
                      ? item.attributes["large-image-url"]
                      : img
                  }
                />
                <Card.Body>
                  <Card.Title>
                    <span> {truncateString(item.attributes.name, 35)}</span>
                  </Card.Title>

                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={style}>
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{ color: "#1a5319", marginRight: "4px" }}
                      />{" "}
                      {formatDate(item.attributes["starts-at"])}
                    </ListGroup.Item>
                    <ListGroup.Item style={style}>
                      {" "}
                      <strong>Event ID: </strong>
                    </ListGroup.Item>

                    {item.attributes["location-name"] ? (
                      <ListGroup.Item style={style}>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          style={{ color: "#1a5319", marginRight: "6px" }}
                        />

                        {item.attributes["location-name"]}
                      </ListGroup.Item>
                    ) : (
                      <ListGroup.Item style={style}>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          style={{ color: "#1a5319", marginRight: "6px" }}
                        />
                        Will posted soon..
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item style={style}>
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ color: "#1a5319", marginRight: "6px" }}
                      />

                      {item.attributes.timezone}
                    </ListGroup.Item>

                    <ListGroup.Item style={style}>
                      <strong>Event Owner: </strong>
                      {item.attributes["owner-name"]
                        ? item.attributes["owner-name"]
                        : "Unknown"}
                    </ListGroup.Item>
                  </ListGroup>

                  <Card.Body>
                    <Button
                      onClick={() => navigate("/eventDetails")}
                      variant="success"
                      coloronhover="#508d4e"
                      backgroundcolor="#80af81"
                      bordercolor={"#508d4e"}
                      width="100%"
                    >
                      {" "}
                      Event Details
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
