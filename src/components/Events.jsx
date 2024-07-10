import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Events() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Event Title</Card.Title>
        <Card.Text>Body</Card.Text>
        <Button variant="primary">I am Still doing nothing</Button>
      </Card.Body>
    </Card>
  );
}

export default Events;
