import { useContext, useEffect, useState } from "react";
import { LaunchesContext } from "../../App";
import VehicleGraph from "./vehicle_graph";
import AnnualGraph from "./annual_graph";
import CountryGraph from "./country_graph";
import { Container, Row, Col } from "react-bootstrap";
import cookie from 'cookie';
// import { canvas } from "chart.js/dist/helpers/helpers.canvas";

function Metrics() {
  const {launches} = useContext(LaunchesContext)
  const [mutableLaunches, setMutableLaunches] = useState([])
  const [launchSites, setLaunchSites] = useState([])

  useEffect(() => {
    let LoggedIn = cookie.parse(document.cookie).LoggedIn
    if(LoggedIn){
      console.log('launches', launches)
      let currentTime = new Date();
      let moddedLaunches = launches.filter(launch => launch.status == "success")
      setMutableLaunches(moddedLaunches)
      // console.log('launches: ', launches)
      console.log('moddedLaunches: ',moddedLaunches)
      fetch('http://localhost:8080/table/launch_site', {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => setLaunchSites(data))
    }
  }, [launches])

  return (
    <>
      {mutableLaunches.length > 0 ? (
        <Container>
          <Row className="h-50">
            <Col>
              <VehicleGraph launches={mutableLaunches}/>
            </Col>
            <Col>
              <AnnualGraph launches={mutableLaunches}/>
            </Col>


          </Row>
          <Row className="h-25">
          <CountryGraph sites={launchSites} launches={mutableLaunches}/>
          </Row>
        </Container>
      ) :
      (
        <>Loading</>
      )}

    </>
  )
}

export default Metrics;