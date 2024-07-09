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
  Button as BootstrapButton,
  Form as BootstrapForm,
  Container as BootstrapContainer,
  Row,
  Col,
} from "react-bootstrap";
import MyAlert from "./Alerts";
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
  display: block;
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

const Button = styled(BootstrapButton)`
  background-color: #80af81;
  border: none;
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    background: #508d4e;
  }
  &:active,
  &:focus {
    background: #508d4e !important;
  }
`;
const Container = styled(BootstrapContainer)`
  background-color: #d6efd8;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 12px 8px;
  width: 500px;
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
      {error ? (
        <MyAlert
          Message={`User Already exists. Please Login `}
          icon={iconError}
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
              <Form.Text id="error">{errors.passwordRepeat?.message}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              {icon} Register
            </Button>
            <Link to="/login">Login</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default MyForm;
