import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import img from "../assets/bg.webp";

function EventDetails() {
  return (
    <Container fluid>
      <Row>
        <Col style={{ overflow: "hidden" }}>
          <Image src={img} width={"100%"} height={"200px"} />
        </Col>
      </Row>
      <Row>
        <strong>Events Details</strong>
      </Row>
      <Row>
        <Col>Date and Time</Col>
        <Col>Venue</Col>
        <Col>Venue</Col>
      </Row>
    </Container>
  );
}

export default EventDetails;
