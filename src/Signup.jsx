import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import AuthContext from "./AuthProvider";
import axios from "axios";
import styled from "styled-components";
import "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import {
  Button as BootstrapButton,
  Form as BootstrapForm,
  Container as BootstrapContainer,
  Row,
  Col,
} from "react-bootstrap";
import MyAlert from "./Alerts";
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
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const LOGIN_URL = "https://api.eventyay.com/v1/auth/login";
  const { setAuth } = useContext(AuthContext);
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

  async function login(data) {
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          email: data.email,
          password: data.password,
          passwordRepeat: data.passwordRepeat,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        const token = response.data.access_token;
        localStorage.setItem("Token", token);
        setAuth({ token });
        navigate("/profile");
      }
    } catch (error) {
      const myError = error.response.status;
      setError(myError);
    }
  }
  function onSubmit(data) {
    login(data);
  }
  const icon = <FontAwesomeIcon icon={faUserPlus} />;
  return (
    <Container>
      {error === 401 ? <MyAlert Message={"Invalid Credentials"} /> : null}

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
                placeholder="password"
                {...register("password")}
              />
              <Form.Text id="error">{errors.password?.message}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="password"
                {...register("passwordRepeat")}
              />
              <Form.Text id="error">{errors.passwordRepeat?.message}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              {icon} Register
            </Button>
          </Form>
        </Col>
        <Link to="/">Login</Link>
      </Row>
    </Container>
  );
}

export default MyForm;
