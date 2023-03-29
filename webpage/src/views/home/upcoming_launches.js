import LaunchCard from "./launch_card";
import {Container} from 'react-bootstrap';

function UpcomingLaunches({filter,handleClick}) {
    return (
      <Container className="UpcomingLaunches">
        <LaunchCard filter={filter} handleClick={handleClick}/>
      </Container>
    );
  }
  
  export default UpcomingLaunches;