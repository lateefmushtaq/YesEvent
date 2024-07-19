import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Logout from "./Logout";
import { useEffect, useState } from "react";

const CustomNavbar = styled(Navbar)`
  background-color: ${(props) => props.bgColor};
  .nav-link {
    color: aliceblue;
  }
`;
function NavBar() {
  const [login, setLogin] = useState("");
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  useEffect(() => {
    setLogin(token);
  }, [token, navigate]);

  return (
    <CustomNavbar expand="lg" bgColor="#508d4e">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={token ? "/dashboard" : "/login"}>
              Dashboard
            </Nav.Link>
          </Nav>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          {login ? (
            <Nav.Link>
              <Logout />
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to={"/login"}>
              Login
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </CustomNavbar>
  );
}

export default NavBar;
