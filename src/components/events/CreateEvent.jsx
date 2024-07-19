import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../contextProvider/AuthProvider";
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Container as BootstrapContainer,
  Container,
} from "react-bootstrap";
import MyButton from "../buttons/CreateEventButton";
import { Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MyAlert from "../Alerts";
import { faCircleCheck, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledContainerMain = styled(BootstrapContainer)`
  background-color: #e3f6e9;
  margin: auto;
  padding: 8px 12px;
  border: 2px solid #1a5319;
  border-radius: 0px 0px 8px 8px;
  &:hover {
    box-shadow: 0px 12px 1px #1a5319;
  }
`;
const SytledContainer = styled(BootstrapContainer)`
  background-color: #e3f6e9;
  margin: auto;
  padding: 8px 12px;
  border: 2px solid #1a5319;
  border-radius: 8px 8px 0px 0px;
  margin-bottom: -2px;
  margin-top: 3rem;
  box-shadow: 0px -12px 0px #1a5319;

  &:hover {
    box-shadow: 0px 12px 0px #1a5319;
  }
`;
const StyledFloatingLabel = styled(FloatingLabel)`
  margin-bottom: 1rem;
`;
const StyledForm = styled(Form)`
  .form-control,
  .form-select {
    border: 2px solid transparent;
    padding: 10px;
    &:focus {
      border-color: #508d4e;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
    }
    &::placeholder {
      font-size: 14px;
      font-weight: 400;
      color: #1a5319;
      margin-bottom: 4px;
    }
  }
  .form-label {
    font-size: 14px;
    font-weight: 600;
    color: #1a5319;
    margin-bottom: 4px;
  }
  .form-select {
    font-size: 14px;
    font-weight: 400;
    color: #1a5319;
    margin-bottom: 4px;
  }

  #error {
    color: red;
    margin-left: 10px;
  }
`;
const schema = yup.object().shape({
  eventName: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  venueType: yup.string().required("venue is required"),
});

function CreateEvent() {
  const [message, setMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { setEventData } = useContext(AuthContext);

  function onSubmit(data) {
    if (data) {
      const formData = {
        id: Date.now(),
        name: data.eventName,
        eventTopic: data.eventTopic,
        location: data.location,
        venue: data.venueType,
        description: data.description,
      };
      setEventData((pre) => [...pre, formData]);

      setMessage(true);
      reset();
    }
  }

  function handleCancel() {
    navigate("/dashboard");
  }

  return (
    <Container>
      <SytledContainer>
        {" "}
        <Col
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1A5319",
            padding: "12px",
          }}
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            style={{ color: "#1a5319", marginRight: "8px" }}
          />
          Create Event
        </Col>
      </SytledContainer>

      <StyledContainerMain>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {message !== false && (
            <MyAlert
              variant={"success"}
              icon={
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  beatFade
                  style={{ marginRight: "12px" }}
                />
              }
              Message={"hello"}
              backgroundColor={"#80af81"}
              color={"#fff"}
              border={"#508d4e"}
              margin={"12px"}
              radius={"6px"}
            />
          )}
          <Row className="mb-3">
            <StyledForm.Group as={Col} xs={12} md={4}>
              <StyledForm.Label>Event Name</StyledForm.Label>

              <StyledForm.Control
                type="text"
                id="eventName"
                placeholder="Enter Event Name"
                {...register("eventName")}
              />
              {errors.eventName && errors.eventName.message}
            </StyledForm.Group>
            <StyledForm.Group as={Col} xs={12} md={4}>
              <StyledForm.Label>Select Event Type</StyledForm.Label>
              <StyledForm.Select
                defaultValue=""
                id="eventType"
                {...register("eventType")}
              >
                {errors.eventName && errors.eventName.message}
                <option value="" disabled>
                  Event Type
                </option>
                <option>Festival</option>
                <option>Conference</option>
                <option>Networking</option>
              </StyledForm.Select>
            </StyledForm.Group>
            <StyledForm.Group as={Col} xs={12} md={4}>
              <StyledForm.Label> Select Topic</StyledForm.Label>
              <StyledForm.Select
                defaultValue=""
                id="eventTopic"
                {...register("eventTopic")}
              >
                <option value="" disabled>
                  Select Topic
                </option>
                <option>ReactJs</option>
                <option>Lateef</option>
                <option>Cars</option>
              </StyledForm.Select>
            </StyledForm.Group>
          </Row>

          <Row className="mb-3">
            <StyledForm.Group as={Col} xs={12} md={4}>
              <StyledForm.Label>Venue Type</StyledForm.Label>
              <StyledForm.Select
                defaultValue=""
                id="venueType"
                {...register("venueType")}
              >
                <option disabled value="">
                  Choose Venue Type
                </option>
                <option>Online</option>
                <option>Offline</option>
              </StyledForm.Select>
            </StyledForm.Group>

            <StyledForm.Group as={Col} xs={12} md={4}>
              <StyledForm.Label>Venue</StyledForm.Label>
              <StyledForm.Control
                placeholder="Online/Links/"
                id="location"
                {...register("location")}
              />
            </StyledForm.Group>
            <StyledForm.Group as={Col} xs={12} md={4}>
              <StyledForm.Label>Select Image Header</StyledForm.Label>
              <StyledForm.Control
                type="file"
                name="file"
                id="file"
                {...register("file")}
                isInvalid={!!errors.file}
              />
              <StyledForm.Control.Feedback type="invalid" tooltip>
                {errors.file && errors.file.message}
              </StyledForm.Control.Feedback>
            </StyledForm.Group>
          </Row>
          <Row className="mb-3">
            <StyledFloatingLabel
              style={{ padding: "8px" }}
              label="Description"
              as={Col}
              xs={12}
              md={12}
            >
              <StyledForm.Control
                id="description"
                {...register("description")}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </StyledFloatingLabel>
          </Row>

          <Row className="justify-content-end mb-3">
            <Col className="mb-4" xs={12} md="auto">
              <MyButton
                variant="primary"
                type="submit"
                coloronhover="#1A5319"
                backgroundcolor="#508d4e"
                color="#f8f8f8"
                width="100%"
                bordercolor="#1A5319"
              >
                Create Event
              </MyButton>
            </Col>

            <Col className="mb-4" xs={12} md="auto">
              <MyButton
                variant="danger"
                type="button"
                coloronhover="#900C3F"
                backgroundcolor="#f8f8f8"
                color="#900C3F"
                width="100%"
                bordercolor="#900C3F"
                handleclick={handleCancel}
              >
                Cancel
              </MyButton>
            </Col>
          </Row>
          <Outlet />
        </StyledForm>
      </StyledContainerMain>
    </Container>
  );
}

export default CreateEvent;
