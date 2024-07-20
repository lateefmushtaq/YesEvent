import { useForm } from "react-hook-form";
import { useNavigate, Link as FooterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState, useEffect } from "react";
import AuthContext from "./contextProvider/AuthProvider";
import axios from "axios";
import styled from "styled-components";
import { Button } from "./buttons/CreateEventButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Form as BootstrapForm,
  Container as BootstrapContainer,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import MyAlert from "./Alerts";

const Form = styled(BootstrapForm)`
  margin: 2rem;
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
  text-align: center;
  margin-top: 1rem;
`;

const SytledContainer = styled(BootstrapContainer)`
  background-color: #d6efd8;
  margin-top: 2rem;
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
  } = useForm({ resolver: yupResolver(schema),    defaultValues: {
      email: "lateefmushtaq4@gmail.com",
      password: "1234react",
    }, });

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

  return (
    <Container>
      {" "}
      <SytledContainer>
        {error === 401 ? (
          <MyAlert Message={error} icon={iconError} variant={"danger"} />
        ) : null}

        <Row>
          <Col xs={12}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Heading1>
                {" "}
                <FontAwesomeIcon icon={faRightToBracket} /> Login
              </Heading1>
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

              <Button
                type="submit"
                variant="primary"
                coloronhover="#1A5319"
                backgroundcolor="#508d4e"
                color="#f8f8f8"
                width="100%"
                bordercolor="#1A5319"
              >
                {" "}
                <FontAwesomeIcon icon={faRightToBracket} />
                Submit
              </Button>
            </Form>
            <Col style={{ textAlign: "center" }}>
              {" "}
              <Link to="/register">Create a New Account</Link>
            </Col>
          </Col>
        </Row>
      </SytledContainer>
    </Container>
  );
}

export default MyForm;
