import "./App.css";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useState } from "react";
import data from "./components/data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./Routes/Detail";

function App() {
  let [photo] = useState(data);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">GlassApple</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/detail");
                }}
              >
                detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <Container>
                <Row>
                  {photo.map((a, i) => {
                    return <Card photo={photo[i]} i={i + 1}></Card>;
                  })}
                </Row>
              </Container>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail photo={photo}/>} />
        <Route path="*" element={<div>404 not found</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>404 not found</div>} />
          <Route path="location" element={<div>404 not found</div>} />
        </Route>
      </Routes>
    </div>
  );
}

function About(params) {
  return (
    <div>
      <h4>etstetetaset</h4>

    <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <Col sm>
      <Image
        src={process.env.PUBLIC_URL + "/img/IMG_" + props.i + ".JPG"}
        rounded
        width={80}
      />{" "}
      <h4>{props.photo.title}</h4>
      <p> {props.photo.content}</p>{" "}
    </Col>
  );
}

export default App;
