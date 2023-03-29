import './filter.css';
import { useContext } from 'react';
import { LaunchesContext } from '../../App';
import {Button,Container,Row,Col,ButtonGroup} from 'react-bootstrap';

const Filter = ({filter,setFilter}) => {
  let currentTime = new Date();
  let {launches} = useContext(LaunchesContext)
  let uniqueYears = [...new Set(launches.map(launch=>launch.date_time.slice(0,4)))].sort(function(a, b){return a-b});
  let uniqueLVs = [...new Set(launches.map(launch=>launch.launch_vehicle))];
  let uniqueLSPs = [...new Set(launches.map(launch=>launch.lsp))];
  let uniqueOrbits = [...new Set(launches.map(launch=>launch.orbit))];
  let uniqueSites = [...new Set(launches.map(launch=>launch.site_name))];
  launches = launches.filter(launch => launch.date_time > currentTime.toISOString());

  const handleOrbitFilter = (event,prop) => {
    if(filter.orbit===prop){
      setFilter({
        ...filter,
        orbit: null,
      })
    } else {
      setFilter({
        ...filter,
        orbit: prop
      })
    }
  }

  const handleDateFilter = (event,prop) => {
    if(filter.date_time===prop){
      setFilter({
        ...filter,
        date_time: null,
      })
    } else {
      setFilter({
        ...filter,
        date_time: prop
      })
    }
  }

  const hanldeLSPFilter = (event,prop) => {
    if(filter.lsp===prop){
      setFilter({
        ...filter,
        lsp: null,
      })
    } else {
      setFilter({
        ...filter,
        lsp: prop
      })
    }
  }

  const hanldeLVFilter = (event,prop) => {
    if(filter.launch_vehicle===prop){
      setFilter({
        ...filter,
        launch_vehicle: null,
      })
    } else {
      setFilter({
        ...filter,
        launch_vehicle: prop
      })
    }
  }

  const handleSiteFilter = (event,prop) => {
    if(filter.site_name===prop){
      setFilter({
        ...filter,
        site_name: null,
      })
    } else {
      setFilter({
        ...filter,
        site_name: prop
      })
    }
  }

  if(launches){
    return (
      <Container className='filter-wrapper mb-2'>
        <Row>
          <Col>
            <h6 className='filter-header'>Launch Vehicle</h6>
            <ButtonGroup size="sm" className='filter-btn-group'>
              {uniqueLVs.map((item, index) =>
                filter.launch_vehicle === item ?
                  <Button className='selected-filter-btn' variant="primary" key={index} onClick={(event) => hanldeLVFilter(event, item)}>{item}</Button> :
                  <Button className='filter-btn' variant="dark" key={index} onClick={(event) => hanldeLVFilter(event, item)}>{item}</Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
        <Row >
          <Col>
            <h6 className='filter-header'>Launch Service Provider</h6>
            <ButtonGroup size='sm' className='filter-btn-group'>
              {uniqueLSPs.map((item, index) =>
                filter.lsp === item ?
                  <Button className='selected-filter-btn' variant="primary" key={index} onClick={(event) => hanldeLSPFilter(event, item)}>{item}</Button> :
                  <Button className='filter-btn' variant="dark" key={index} onClick={(event) => hanldeLSPFilter(event, item)}>{item}</Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className='filter-header'>Orbit</h6>
            <ButtonGroup size='sm' className='filter-btn-group'>
              {uniqueOrbits.map((item, index) =>
                filter.orbit === item ?
                  <Button className='selected-filter-btn' variant="primary" key={index} onClick={(event) => handleOrbitFilter(event, item)}>{item}</Button> :
                  <Button className='filter-btn' variant="dark" key={index} onClick={(event) => handleOrbitFilter(event, item)}>{item}</Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className='filter-header'>Year</h6>
            <ButtonGroup size='sm' className='filter-btn-group'>
              {uniqueYears.map((item, index) =>
                filter.date_time === item ?
                  <Button className='selected-filter-btn' variant="primary" key={index} onClick={(event) => handleDateFilter(event, item)}>{item}</Button> :
                  <Button className='filter-btn' variant="dark" key={index} onClick={(event) => handleDateFilter(event, item)}>{item}</Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className='filter-header'>Location</h6>
            <ButtonGroup size="sm" className='filter-btn-group'>
              {uniqueSites.map((item, index) =>
                filter.site_name === item ?
                  <Button className='selected-filter-btn' variant="primary" key={index} onClick={(event) => handleSiteFilter(event, item)}>{item}</Button> :
                  <Button className='filter-btn' variant="dark" key={index} onClick={(event) => handleSiteFilter(event, item)}>{item}</Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    );
  }
  }
  
  export default Filter;