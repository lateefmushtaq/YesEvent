import { useForm } from "react-hook-form";
import { useNavigate, Link as FooterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState, useEffect } from "react";
import AuthContext from "./contextProvider/AuthProvider";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
const Link = styled(FooterLink)`
  color: #508d4e;
  text-decoration: underline;
  font-weight: bold;
  display: block;
  text-align: center;
  margin-top: 1rem;
`;
export const Button = styled(BootstrapButton)`
  background-color: #80af81;
  border: none;
  width: 100%;

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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const iconError = (
    <FontAwesomeIcon
      icon={faTriangleExclamation}
      style={{ marginRight: "8px" }}
    />
  );
  const LOGIN_URL = "https://api.eventyay.com/v1/auth/login";
  const { setAuth } = useContext(AuthContext);
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is Required"),
    password: yup.string().min(4).max(18).required(),
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
        navigate("/dashboard");
      }
    } catch (error) {
      const myError = error.response.status;
      setError(myError);
    }
  }
  function onSubmit(data) {
    login(data);
  }
  const icon = <FontAwesomeIcon icon={faRightToBracket} />;
  return (
    <Container>
      {error === 401 ? (
        <MyAlert Message={"Invalid Credentials"} icon={iconError} />
      ) : null}

      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Heading1> {icon} Login</Heading1>
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
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <div
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Form.Text id="error">{errors.password?.message}</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              {icon} Submit
            </Button>
          </Form>
          <Col style={{ textAlign: "center" }}>
            {" "}
            <Link to="/register">Create a New Account</Link>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default MyForm;
