import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Row } from "react-bootstrap";
import MyButton from "./buttons/CreateEventButton";
import { useNavigate } from "react-router-dom";
import Events from "./events/Events";

function Dashboard() {
  const navigate = useNavigate();
  function eventButton() {
    navigate("/createEvent");
  }
  return (
    <>
      {" "}
      <Card className="text-center" style={{ overflow: "hidden" }}>
        <Card.Title>Yes Events</Card.Title>
        <Card.Text>Event solution for virtual and in-person events</Card.Text>
        <Row xs={1} md={3} className="g-4" style={{ justifyContent: "center" }}>
          <MyButton
            coloronhover="#508d4e"
            backgroundcolor="#80af81"
            color="#fff"
            handleclick={eventButton}
            width="300px"
          >
            {" "}
            <FontAwesomeIcon icon={faPlus} />
            Create Events
          </MyButton>
        </Row>
      </Card>
      <Events />
    </>
  );
}

export default Dashboard;
