import React from "react";

import { Card } from "react-bootstrap";

import CreateEventButton from "./buttons/CreateEventButton";

function Dashboard() {
  return (
    <Card className="text-center" style={{ overflow: "hidden" }}>
      <Card.Title>Yes Events</Card.Title>
      <Card.Text>Event solution for virtual and in-person events</Card.Text>
      <CreateEventButton />
    </Card>
  );
}

export default Dashboard;
