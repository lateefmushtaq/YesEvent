import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../contextProvider/AuthProvider";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Button } from "../buttons/CreateEventButton";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  eventName: yup.string().required("Name is required"),
  file: yup
    .mixed()
    .test(
      "fileFormat",
      "Only JPEG, PNG, WEBP, and GIF files are accepted",
      (value) => {
        if (!value || value.length === 0) {
          return true; // Allow empty value
        }
        return ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          value[0].type
        );
      }
    ),
});

function CreateEvent() {
  const navigate = useNavigate();
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
      Links: data.Links,
      linkName: data.linkName,
      fileData: data.file[0]
        ? {
            name: URL.createObjectURL(data.file[0]),
            type: data.file[0].type,
            size: data.file[0].size,
            lastModified: data.file[0].lastModified,
          }
        : null,
    };

    setEventData((prevData) => [...prevData, formData]);
    navigate("/otherDetails");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Label>Event Name</Form.Label>
          {errors.eventName && <p>{errors.eventName.message}</p>}
          <Form.Control
            type="text"
            id="eventName"
            placeholder="Enter Event Name"
            {...register("eventName")}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Label>Select Event Type</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            id="eventType"
            {...register("eventType")}
          >
            <option></option>
            <option>Festival</option>
            <option>Conference</option>
            <option>Networking</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Label>Select Topic</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            id="eventTopic"
            {...register("eventTopic")}
          >
            <option></option>
            <option>ReactJs</option>
            <option>Lateef</option>
            <option>Cars</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Label> Venue Type</Form.Label>
          <Form.Select
            defaultValue=""
            id="venueType"
            {...register("venueType")}
          >
            <option disabled value="">
              Choose Venue Type
            </option>
            <option>Online</option>
            <option>Offline</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} xs={12} md={4}>
          <Form.Label>Venue</Form.Label>
          <Form.Control
            placeholder="Online/Links/"
            id="venueData"
            {...register("venueData")}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Label>Select Image Header</Form.Label>
          <Form.Control
            type="file"
            name="file"
            id="file"
            {...register("file")}
            isInvalid={!!errors.file}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.file && errors.file.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <FloatingLabel label="Description" as={Col} xs={12} md={12}>
          <Form.Control
            id="description"
            {...register("description")}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </Row>

      <Row className="mb-2" style={{ justifyContent: "end" }}>
        <Button
          variant="primary"
          type="submit"
          coloronhover="#508d4e"
          backgroundcolor="#80af81"
          color="#fff"
          handleClick={onSubmit}
          width="400px"
        >
          Next
        </Button>

        <Button
          variant="danger"
          type="reset"
          coloronhover="#ee4e4e"
          bord
          backgroundcolor="#f8f8f8"
          color="#ee4e4e"
          handleClick={onSubmit}
          width="300px"
        >
          Cancel
        </Button>
      </Row>
    </Form>
  );
}

export default CreateEvent;
