import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
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
import { faCircleCheck, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled(BootstrapContainer)`
  background-color: #e3f6e9;
  margin: auto;
  padding: 8px 12px;
  border: 2px solid #1a5319;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 8px 0px #1a5319;
  &:hover {
    border-color: #acd793;
    box-shadow: 0px 8px 0px #acd793;
    background-color: #e0fbe2;
  }
`;
const SytledContainer = styled(BootstrapContainer)`
  background-color: #e3f6e9;
  margin: 10px;
  padding: 8px 12px;
  border: 2px solid #1a5319;
  border-radius: 8px 8px 0px 0px;
  margin-bottom: -2px;
  margin-top: 3rem;

  &:hover {
    border-color: #acd793;
    box-shadow: 0px 8px 0px #acd793;
    background-color: #e0fbe2;
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
});

function CreateEvent() {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { setEventData } = useContext(AuthContext);
  const token = localStorage.getItem("Token");
  const URL = `https://api.eventyay.com/v1/events`;
  const config = {
    headers: {
      "Content-Type": "application/vnd.api+json",
      Authorization: `JWT ${token}`,
    },
  };
  function onSubmit(data) {
    const body = {
      data: {
        type: "event",
        attributes: {
          name: data.eventName,
          "starts-at": "2099-12-13T23:59:59.123456+00:00",
          "ends-at": "2099-12-14T23:59:59.123456+00:00",
          timezone: "UTC",
          latitude: "1.23456789",
          longitude: "1.23456789",
          "location-name": data.venueData,
          description: data.description,
          "original-image-url":
            "https://www.w3schools.com/html/pic_mountain.jpg",
          "owner-name": "example",
          privacy: "public",
          state: "draft",
          online: false,
        },
      },
    };

    createEvent(body);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4500);
  }

  async function createEvent(body) {
    try {
      let response = await axios.post(URL, body, config);

      setEventData((prevData) => [...prevData, response.data.data]);
    } catch (error) {
      setError(error);
    }
  }

  function handleCancel() {
    navigate("/dashboard");
  }
  if (error) return <div>{error}</div>;
  return (
    <>
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

      <Container>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {alert === true && (
            <MyAlert
              variant={"dark"}
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
                  <Alert.Link as={Link} to="/dashboard">
                    {" "}
                    Your Event
                  </Alert.Link>
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
            <StyledForm.Group as={Col} xs={12} md={4}>
              <StyledForm.Label>Event Name</StyledForm.Label>
              {errors.eventName && <p>{errors.eventName.message}</p>}
              <StyledForm.Control
                type="text"
                id="eventName"
                placeholder="Enter Event Name"
                {...register("eventName")}
              />
            </StyledForm.Group>
            <StyledForm.Group as={Col} xs={12} md={4}>
              <StyledForm.Label>Select Event Type</StyledForm.Label>
              <StyledForm.Select
                defaultValue=""
                id="eventType"
                {...register("eventType")}
              >
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
                id="venueData"
                {...register("venueData")}
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

          <Row
            className="mb-3"
            style={{ justifyContent: "end", margin: "auto", gap: "10px" }}
          >
            <MyButton
              variant="primary"
              type="submit"
              coloronhover="#1A5319"
              backgroundcolor="#508d4e"
              color="#f8f8f8"
              width="150px"
              bordercolor="#1A5319"
            >
              Next
            </MyButton>

            <MyButton
              variant="danger"
              type="button"
              coloronhover="#900C3F"
              backgroundcolor="#f8f8f8"
              color="#900C3F"
              width="100px"
              bordercolor="#900C3F"
              handleclick={handleCancel}
            >
              Cancel
            </MyButton>
          </Row>
          <Outlet />
        </StyledForm>
      </Container>
    </>
  );
}

export default CreateEvent;
