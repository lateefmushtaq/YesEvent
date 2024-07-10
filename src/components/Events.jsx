import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import AuthContext from "./contextProvider/AuthProvider";
function Events() {
  const { eventData } = useContext(AuthContext);

  return (
    <>
      {" "}
      {eventData.map((e) => (
        <Card key={e.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{e.name}</Card.Title>

            <Button variant="primary">button</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Events;
