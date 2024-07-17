import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import MyButton from "./buttons/CreateEventButton";
import { useNavigate } from "react-router-dom";
import MyEvents from "./events/MyEvents";
import { Col, Row, Container, Card } from "react-bootstrap";
function Dashboard() {
  const navigate = useNavigate();
  function eventButton() {
    navigate("/createEvent");
  }
  return (
    <Container className="mt-4 ">
      <Row>
        <Col>
          {" "}
          <Card
            className="text-center"
            style={{ overflow: "hidden", padding: "8px" }}
          >
            <Card.Title>Yes Events</Card.Title>
            <Card.Text>
              Event solution for virtual and in-person events
            </Card.Text>
            <Row
              xs={1}
              md={3}
              className="g-4"
              style={{ justifyContent: "center" }}
            >
              <MyButton
                coloronhover="#508d4e"
                backgroundcolor="#80af81"
                color="#fff"
                handleclick={eventButton}
                width="50%"
                margin={"8px"}
              >
                {" "}
                <FontAwesomeIcon icon={faPlus} />
                Create Events
              </MyButton>
            </Row>
          </Card>
        </Col>
      </Row>{" "}
      <MyEvents />
    </Container>
  );
}

export default Dashboard;
