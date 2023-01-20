import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { isAuthenticated } from "../apicalls/restaurantapicalls";
import logo from "../logo2.png";

const Menu = () => {
  // const { user, token } = isAuthenticated();
  // const userId = user._id;

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
            {/* {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Nav className="me-auto">
                <Nav.Link href={`/menu/${userId}`} className="text-dark">
                  <h5 className="text-capitalize">My Menu</h5>
                </Nav.Link>
              </Nav>
            )} */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
