import React, { useState }from 'react';
import Globe from "./globe";
import Timeline from "./timeline";
import UpcomingLaunches from "./upcoming_launches";
import Filter from "./filter";
import {Container,Row,Col} from "react-bootstrap"

function Home() {
  const [selectedLaunch, setSelectedLaunch] = useState([]);
  const [filter,setFilter] = useState({
    date_time: null ,
    launch_vehicle: null ,
    lsp: null,
    orbit: null,
    site_name: null})

  const handleClick = (info) => {
    setSelectedLaunch(info);
  } 

      return (
        <Container className="Home">
          <Row>
            <Timeline/>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <UpcomingLaunches filter={filter} handleClick={handleClick}/>
            </Col>
            <Col>
              <Row>
                <Globe selectedLaunch={selectedLaunch}/>
              </Row>
              <Row>
                <Col>
                  <Filter filter={filter} setFilter={setFilter}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
  }
  
  export default Home;