import React from 'react';
import { useContext } from 'react';
import { LoginContext } from '../App.js';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, Navbar as Navy, Nav } from 'react-bootstrap';
import cookie from 'cookie';
import './navbar.css'

function Navbar() {
  const Navigate = useNavigate();
  // const { loggedIn, setLoggedIn, users } = useContext(LoginContext);

  let LoggedIn = cookie.parse(document.cookie).LoggedIn
  let username = cookie.parse(document.cookie).user
  // console.log('username from navbar:\n', username)

  if (LoggedIn) {
    return (
      <Navy bg="dark" variant="dark" sticky="top">
        <Container>
          <Navy.Brand href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-KywgIRgQ4hLVoPNDyy_vRpuYSdw6TAGKxa4P7Cays4mj84V&s"
              width="100"
              height="80"
              className="d-inline-block align-top rounded"
              alt="logo"
            />

          </Navy.Brand>
          <Col className="me-auto">
            <h1 className='title'>Shooting Stars</h1>
          </Col>

          <Nav className="me-auto">

            <Nav.Link href="/calendar">Calendar</Nav.Link>
            <Nav.Link href="/metrics">Metrics</Nav.Link>
          </Nav>
          <Navy.Collapse className="justify-content-end">
            <Navy.Text>
              Signed in as:  <span id='user-name'>{username}</span>
            </Navy.Text>
            <Button className='mx-4' onClick={() => {
              Navigate("/login");
              document.cookie = "LoggedIn=; expires=0";
              let LoggedIn = cookie.parse(document.cookie).LoggedIn
              console.log('cookie from logout:\n', LoggedIn)
              // setLoggedIn(false);
            }} variant="outline-light">Logout</Button>
          </Navy.Collapse>
        </Container>
      </Navy>
    );
  } else {
    return (
      <Navy className='Navbar' bg="dark" variant="dark" sticky="top">
        <Container>
          <Navy.Brand href="/">
            <img
              id="user-thumb"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-KywgIRgQ4hLVoPNDyy_vRpuYSdw6TAGKxa4P7Cays4mj84V&s"
              width="100"
              height="80"
              className="d-inline-block align-top rounded"
              alt="user-profile"
            />

          </Navy.Brand>
          <Col className="me-auto">
            <h1 className='title'>Shooting Stars</h1>
          </Col>
        </Container>
      </Navy>
    );
  }
}

export default Navbar;