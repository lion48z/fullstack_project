import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
//Nav component 
function Navigation() {
  //render Navbar with react-bootstrap library

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">North Mountain Workout Club</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/*Navbar toggle responsive to use of small screens*/}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <CustomLink href="/home">Home</CustomLink>
            <CustomLink href="/register">Register</CustomLink>
            <CustomLink href="/dashboard">Dashboard</CustomLink>
            <CustomLink href="/login">Login</CustomLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
//custom link component to use for rendering custom links 
//determines whether it is the active window or not 

function CustomLink({ href, children }) {
  return (
    <Nav.Link href={href} className={window.location.pathname === href ? "active" : ""}>
      {children}
    </Nav.Link>
  );
}

export default Navigation;
