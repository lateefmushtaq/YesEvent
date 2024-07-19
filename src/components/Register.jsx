import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import styled from "styled-components";
import { Link as FooterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import {
  Form as BootstrapForm,
  Container as BootstrapContainer,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import MyAlert from "./Alerts";
import MyButton from "./buttons/CreateEventButton";
const iconError = (
  <FontAwesomeIcon
    icon={faTriangleExclamation}
    style={{ marginRight: "8px" }}
  />
);
const Link = styled(FooterLink)`
  color: #508d4e;
  text-decoration: underline;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
`;

const Form = styled(BootstrapForm)`
  margin: 20px;

  .form-control {
    border: 2px solid transparent;
    padding: 10px;
    &:focus {
      border-color: #508d4e;
      box-shadow: none;
    }
  }
  #error {
    color: red;
    margin-left: 10px;
  }
`;

const StyledContainer = styled(BootstrapContainer)`
  background-color: #d6efd8;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 12px 8px;
  border: 2px solid #508d4e;
  border-radius: 8px;
`;
const Heading1 = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #12372a;
  text-align: center;
`;

function MyForm() {
  const [error, setError] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(18).required(),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    data ? setError(true) : setError(false);
  }
  const icon = <FontAwesomeIcon icon={faUserPlus} />;
  return (
    <Container>
      {" "}
      <StyledContainer>
        {error ? (
          <MyAlert
            Message={`User Already exists. Please Login `}
            icon={iconError}
            backgroundcolor={"#ee4e4e"}
            color={"#fff"}
            border={"#f5c6cb"}
          />
        ) : null}

        <Row>
          <Col xs={12}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Heading1> {icon} Signup</Heading1>
              <Form.Group className="mb-3">
                <Form.Label> Email address</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email")}
                />
                <Form.Text id="error">{errors.email?.message}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <Form.Text id="error">{errors.password?.message}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder=" Repeat Password"
                  {...register("passwordRepeat")}
                />
                <Form.Text id="error">
                  {errors.passwordRepeat?.message}
                </Form.Text>
              </Form.Group>
              <MyButton
                variant="primary"
                type="submit"
                coloronhover="#1A5319"
                backgroundcolor="#508d4e"
                color="#f8f8f8"
                width="100%"
                bordercolor="#1A5319"
              >
                {icon} Register
              </MyButton>
            </Form>
            <Col style={{ textAlign: "center" }}>
              {" "}
              <Link to="/login">Login</Link>
            </Col>
          </Col>
        </Row>
      </StyledContainer>
    </Container>
  );
}

export default MyForm;
