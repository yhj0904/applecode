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
import { createContext, useState } from "react";
import data from "./components/data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./Routes/Detail";
import axios from 'axios'

export let Context1 = createContext()   
//Context API =성능이슈, 컴포넌트 재활용 어려움 state 변경시 context를 안쓰는 다른것들까지 재랜더링


function App() {
  let [photo, setPhoto] = useState(data);
  const [inventory, setInventory] = useState([10,20,30]);

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
                    return <Card photo={photo[i]} i={i}></Card>;
                  })}
                </Row>
              </Container>
              <button onClick={()=>{

                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((result)=>{
                          let copy =[...photo, ...result.data];
                          setPhoto(copy);
                  })
                  .catch()
              }}>더보기</button>
            </>
          }
        /> 
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ inventory}}>
        <Detail photo={photo}/>
        </Context1.Provider>
        } />
        <Route path="*" element={<div>404 not found</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>404 not found</div>} />
          <Route path="location" element={<div>404 not found</div>} />
        </Route>
      </Routes>

    </div>



  );
}
/*동시에 ajax 
promise.all([axios.get('/url1'),axios.get('/url2')])
.then(()=>{
      두개다 성공했을때 짜기 쓰기  
})
*/
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
      <Link to={"/detail/" + props.i}>
      <Image
        src={process.env.PUBLIC_URL + "/img/IMG_" + (props.i+1) + ".JPG"}
        rounded
        width={80}
      />{" "}
      <h4>{props.photo.title}</h4>
      <p> {props.photo.content}</p>{" "}
      </Link>
    </Col>
  );
}



export default App;
