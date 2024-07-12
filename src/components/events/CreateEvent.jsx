import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../contextProvider/AuthProvider";
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Container as BootstrapContainer,
} from "react-bootstrap";
import MyButton from "../buttons/CreateEventButton";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MyAlert from "../Alerts";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
const Container = styled(BootstrapContainer)`
  background-color: #d6efd8;
  margin: auto;
  padding: 12px 8px;
  border: 2px solid #508d4e;
  border-radius: 8px;
`;
const schema = yup.object().shape({
  eventName: yup.string().required("Name is required"),
});

function CreateEvent() {
  const [alert, setAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { setEventData } = useContext(AuthContext);

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
      startDate: data.startDate,
      endDate: data.endDate,
      specialRequirements: data.specialRequirements,
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
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4500);
  }

  function handleCancel() {
    navigate("/dashboard");
  }

  // const done = <FontAwesomeIcon icon="fa-solid fa-circle-check" />;
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {alert === true && (
          <MyAlert
            icon={
              <FontAwesomeIcon
                icon={faCircleCheck}
                beatFade
                style={{ marginRight: "12px" }}
              />
            }
            Message={
              <span>
                Event Created Sucessfully{" "}
                <Link to={"/dashboard"}> Your Event</Link>
              </span>
            }
            backgroundcolor={"#80af81"}
            color={"#fff"}
            border={"#508d4e"}
            margin={"12px"}
            radius={"6px"}
          />
        )}
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
            <Form.Label>Venue Type</Form.Label>
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

        <Row
          className="mb-3"
          style={{ justifyContent: "end", margin: "auto", gap: "10px" }}
        >
          <MyButton
            variant="primary"
            type="submit"
            coloronhover="#508d4e"
            backgroundcolor="#80af81"
            color="#fff"
            width="150px"
          >
            Next
          </MyButton>

          <MyButton
            variant="danger"
            type="button"
            coloronhover="#ee4e4e"
            backgroundcolor="#f8f8f8"
            color="#ee4e4e"
            width="100px"
            handleclick={handleCancel}
          >
            Cancel
          </MyButton>
        </Row>
        <Outlet />
      </Form>
    </Container>
  );
}

export default CreateEvent;
