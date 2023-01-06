import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import logo from "../logo2.png";

const Menu = () => {
  return (
    <>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto">
              <Nav.Link href="#home" className="text-dark">
                Home
              </Nav.Link>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
