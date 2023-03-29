import React, { useContext, useState, useEffect }  from 'react'
import ReactPaginate from 'react-paginate';
import { LaunchesContext } from '../../App';
import {Container,Row,Col,Accordion,Badge} from 'react-bootstrap'

function Launch_card({filter,handleClick}) {
    const {launches} = useContext(LaunchesContext);
    let currentTime = new Date();
    let futureLaunches = launches.filter(launch => launch.date_time > currentTime.toISOString())
    const [shownPage, setShownPage] = useState(0)
    const perPage = 4;

    function handlePageClick({selected: selectedPage}){
        // console.log("selectedpage", selectedPage);
        setShownPage(selectedPage);
    }

    let filteredLaunches = futureLaunches;

    if(filter.orbit){
        filteredLaunches = filteredLaunches
        .filter(launch=>launch.orbit.includes(filter.orbit))
    }

    if(filter.site_name){
        filteredLaunches = filteredLaunches
        .filter(launch=>launch.site_name.includes(filter.site_name))
    }

    if(filter.lsp){
        filteredLaunches = filteredLaunches
        .filter(launch=>launch.lsp.includes(filter.lsp))
    }

    if(filter.date_time){
        filteredLaunches = filteredLaunches
        .filter(launch=>launch.date_time.includes(filter.date_time))
    }

    if(filter.launch_vehicle){
        filteredLaunches = filteredLaunches
        .filter(launch=>launch.launch_vehicle.includes(filter.launch_vehicle))
    }

    const offset = shownPage * perPage;

    const currentPageData = filteredLaunches.slice(offset, offset + perPage).map((info,i) => {
        return (
        <Container  key={i} onClick={() => handleClick(info)} className="container-fluid upcomingLaunchCard py-2 my-2">
            <Row>
              <Col md={5} lg={5}>
                <img
                className='cardImage rounded'
                src={info.img}
                alt={info.launch_vehicle}
                />
              </Col>
              <Col md={5} lg={5}>
                <Row>
                  <h4 className="card-title">{info.launch_vehicle}</h4>
                </Row>
                <Row>
                  <p className="card-text">LSP: {info.lsp}</p>
                </Row>
                <Row>
                  <p className="card-text">Target Orbit: {info.orbit}</p>
                </Row>
                <Row>
                  <p className="card-text">Launch Date: {info.date_time.slice(0,7)}</p>
                </Row>
              </Col>
              <Col>
                {info.status.toUpperCase()==='SUCCESS' ? <Badge bg="success" className="card-status">{info.status.toUpperCase()}</Badge> : info.status.toUpperCase()==='FAILURE' || info.status.toUpperCase()==='CANCELED' ? <Badge bg="danger" className="card-status">{info.status.toUpperCase()}</Badge> : info.status.toUpperCase()==='DELAYED' ? <Badge bg="warning" className="card-status">{info.status.toUpperCase()}</Badge> : <Badge bg="primary" className="card-status">{info.status.toUpperCase()}</Badge>}
              </Col>
            </Row>
            <Row>
                <Accordion onClick={e => e.stopPropagation()} className=' my-2' defaultActiveKey="1" size='small'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >View More</Accordion.Header>
                        <Accordion.Body>
                          <p><span className='extra-info-title'>Customer: </span>{info.payload_customer}</p>
                          <p><span className='extra-info-title'>Mission: </span>{info.payload_mission}</p>
                          <p><span className='extra-info-title'>Payload Description: </span>{info.payload_description}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
        )
    })

    const pageCount = Math.ceil(filteredLaunches.length / perPage)

      return (
        <Container className="upcomingLaunchesDiv">
            {/* <h3 className='upcomingLaunchesHeader'>Upcoming Launches</h3> */}
            {currentPageData}
        <ReactPaginate
            previousLabel= {"<< "}
            nextLabel={"  >>"}
            pageCount= {pageCount}
            onPageChange= {handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            />
        </Container>
      )
    
  }

export default Launch_card;