import React from "react";
import { Button } from "../Login";
import { useNavigate } from "react-router-dom";
function CreateEventButton() {
  const navigate = useNavigate();
  function eventButton() {
    navigate("/createEvent");
  }
  return (
    <Button onClick={eventButton} variant="primary">
      Create Event
    </Button>
  );
}
export default CreateEventButton;
