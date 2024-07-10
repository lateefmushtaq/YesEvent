import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { Form as BootstrapForm, Container, Navbar, Nav } from "react-bootstrap";
import { Button } from "./Login";
import Logout from "./Logout";
import { useEffect } from "react";

const Form = styled(BootstrapForm)`
  .form-control {
    &:focus {
      border-color: #508d4e;
      box-shadow: none;
    }
  }
`;

function NavBar() {
  const token = localStorage.getItem("Token");
  // const navigate = useNavigate();
  // useEffect(() => {
  //   !token && navigate("/login");
  // }, [token, navigate]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-1"
              aria-label="Search"
            />
            <Button variant="outline-success">Search Events</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
      <Nav.Link> {token && <Logout />}</Nav.Link>
    </Navbar>
  );
}

export default NavBar;
