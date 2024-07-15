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
import axios from "axios";
function Events() {
  const { publicEvent, setPublicEvents } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function getData() {
    try {
      const URL = `https://api.eventyay.com/v1/events`;
      const token = localStorage.getItem("Token");
      const config = {
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `JWT ${token}`,
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
    <Row
      xs={1}
      md={3}
      className="g-3"
      style={{ margin: "20px", flexWrap: "wrap" }}
      fluid
    >
      {publicEvent &&
        publicEvent.map((item) => (
          <Col key={item.id}>
            <Card style={{ width: "24rem", overflow: "hidden" }}>
              <Card.Img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                variant="top"
                src={
                  item.attributes["large-image-url"]
                    ? item.attributes["large-image-url"]
                    : img
                }
              />
              <Card.Body>
                <Card.Title>
                  <span> {item.attributes.name}</span>
                </Card.Title>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    {formatDate(item.attributes["starts-at"])}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <strong>Event ID: </strong>
                    {item.id}{" "}
                  </ListGroup.Item>

                  {item.attributes["location-name"] && (
                    <ListGroup.Item>
                      <strong>Venue: </strong>
                      {item.attributes["location-name"]}
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    {" "}
                    <strong>Timezone: </strong>
                    {item.attributes.timezone}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Event Owner: </strong>
                    {item.attributes["owner-name"]
                      ? item.attributes["owner-name"]
                      : "Unknown"}
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
