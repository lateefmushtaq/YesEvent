import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  Button as BootstrapButton,
  Form as BootstrapForm,
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
const Button = styled(BootstrapButton)`
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
`;
function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              {" "}
              Home{" "}
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search Events</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
