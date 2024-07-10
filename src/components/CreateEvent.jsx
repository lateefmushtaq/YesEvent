import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function CreateEvent() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Event Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Event Name" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Select Event Type</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Festival</option>
            <option>Conference</option>
            <option>Networking </option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Select Topic</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>ReactJs</option>
            <option>Lateef</option>
            <option>Cars </option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label> Venue Type</Form.Label>
        <Form.Select defaultValue="Choose...">
          <option>Online</option>
          <option>Offline</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Venue</Form.Label>
        <Form.Control placeholder="Online/Links//" />
      </Form.Group>

      <Row className="mb-3">
        <FloatingLabel
          controlId="floatingTextarea"
          label="Description"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </Row>

      <Row>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Select Logo</Form.Label>
          <Form.Control
            type="file"
            required
            name="file"
            //   onChange={handleChange}
            //   isInvalid={!!errors.file}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {/* {errors.file} */}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Select Header</Form.Label>
          <Form.Control
            type="file"
            required
            name="file"
            //   onChange={handleChange}
            //   isInvalid={!!errors.file}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {/* {errors.file} */}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Next
      </Button>
      <Button variant="danger" type="submit">
        Cancel
      </Button>
    </Form>
  );
}

export default CreateEvent;
