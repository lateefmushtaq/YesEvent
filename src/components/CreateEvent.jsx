import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "./contextProvider/AuthProvider";
const schema = yup.object().shape({
  eventName: yup.string().required("Name is required"),
});

function CreateEvent() {
  const { setEventData } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  function onSubmit(data) {
    const formData = {
      id: new Date().toISOString(),
      name: data.eventName,
      eventType: data.eventType,
      topic: data.eventTopic,
      venueType: data.venueType,
      venueData: data.venueData,
      description: data.description,
    };

    setEventData((prevData) => [...prevData, formData]);
    console.log("Form Data Submitted: ", formData);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Event Name</Form.Label>
          {errors.eventName && <p> {errors.eventName.message}</p>}
          <Form.Control
            type="text"
            id="eventName"
            placeholder="Enter Event Name"
            {...register("eventName")}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Select Event Type</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            id={"eventType"}
            {...register("eventType")}
          >
            <option>Festival</option>
            <option>Conference</option>
            <option>Networking </option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Select Topic</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            id={"eventTopic"}
            {...register("eventTopic")}
          >
            <option>ReactJs</option>
            <option>Lateef</option>
            <option>Cars </option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label> Venue Type</Form.Label>
        <Form.Select
          defaultValue="Choose..."
          id={"venueType"}
          {...register("venueType")}
        >
          <option>Online</option>
          <option>Offline</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Venue</Form.Label>
        <Form.Control
          placeholder="Online/Links/"
          id={"venueData"}
          {...register("venueData")}
        />
      </Form.Group>

      <Row className="mb-3">
        <FloatingLabel label="Description" className="mb-3">
          <Form.Control
            id={"description"}
            {...register("description")}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </Row>

      <Row>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Select Logo</Form.Label>
          <Form.Control type="file" name="file" />
          <Form.Control.Feedback type="invalid" tooltip></Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Select Header</Form.Label>
          <Form.Control
            type="file"
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
