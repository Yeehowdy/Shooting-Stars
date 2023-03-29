import React from 'react';
import { createContext, useEffect, useState, useContext } from 'react';
import { LaunchesContext } from '../../App';
import { Container, Col, Row } from 'react-bootstrap';
import './crud.css'


function Crud({
  pid, 
  lid,
  dt,
  cls,
  vname,
  LV_Id,
  stat,
  sid,
  sname,
  l_s_p,
  orb,
  pcus,
  pmis,
  pdes,
  }) {

  const {launches, trigger, setTrigger} = useContext(LaunchesContext);
  let uniqueLVs = [...new Set(launches.map(launch=> launch.launch_vehicle))];
  let uniqueLvId = [...new Set(launches.map(launch=> launch.lv_id))];
  let uniqueLSPs = [...new Set(launches.map(launch=>launch.lsp))];
  let uniqueOrbits = [...new Set(launches.map(launch=>launch.orbit))];
  let uniqueSites = [...new Set(launches.map(launch=> launch.site_name))];
  let uniqueSiteId = [...new Set(launches.map(launch=> launch.site_id))];
  let uniqueStatus = [...new Set(launches.map(launch=> launch.status))];
  let uniqueClass = [...new Set(launches.map(launch=> launch.payload_classification))];

  const [dateTime, setDateTime] = useState(null);
  const [classification, setClass] = useState(null);
  const [lvId, setLvId] = useState(null);
  const [status, setStatus] = useState(null);
  const [siteId, setSiteId] = useState(null);
  const [lsp, setLsp] = useState(null);
  const [orbit, setOrbit] = useState(null);
  const [payloadCustomer, setPayloadCustomer] = useState(null);
  const [payloadMission, setPayloadMission] = useState(null);
  const [payloadDesc, setPayloadDesc] = useState(null);

  let handlePost = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/launches', {
      method: "POST",
      body: JSON.stringify({
        site_id: siteId, 
        lv_id: lvId,  
        lsp: lsp, 
        orbit: orbit, 
        date_time: dateTime,
        status: status
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => {
      res.json()
      fetch('http://localhost:8080/payloads', {
        method: "POST",
        body: JSON.stringify({
          launch_id: launches.length + 1, 
          customer: payloadCustomer, 
          mission: payloadMission, 
          description: payloadDesc, 
          classification: classification
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => {
        let newTrigger = !trigger
        setTrigger(newTrigger)
        return res.json()
      })
    })
  }

  let handlePatch = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:8080/launches/${lid}`, {
      method: "PUT",
      body: JSON.stringify({
        site_id: siteId, 
        lv_id: lvId,  
        lsp: lsp, 
        orbit: orbit, 
        date_time: dateTime,
        status: status
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => {
      res.json()
      fetch(`http://localhost:8080/payloads/${pid}`, {
        method: "PUT",
        body: JSON.stringify({
          launch_id: lid, 
          customer: payloadCustomer, 
          mission: payloadMission, 
          description: payloadDesc, 
          classification: classification
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => {
        setTrigger(!trigger)
        return res.json()
      })
    })

    console.log("submitted")
  }

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/launches/${lid}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(res => {
      res.json()
      fetch(`http://localhost:8080/payloads/${pid}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(res => {
        setTrigger(!trigger)
        return res.json()
      })
    })
  }

  const [section, setSection] = useState("Post");
  console.log(pid, lid);

  return (
    <div className="crud-container">
      <Container className="toggle">
        <Row className="toggle-row">
          <Col xs="12" className="toggle-col">
            <label>Add</label>
            <label>Update</label>
            <label>Delete</label>
          </Col>
        </Row>
        <Row className="toggle-row">
          <Col xs="12" className="toggle-col">
            <input type="radio" value="Post" name="crud" onChange={(e) => setSection(e.target.value)} checked={section === "Post"}/> 
            <input type="radio" value="Update" name="crud" onChange={(e) => setSection(e.target.value)} checked={section === "Update"}/> 
            <input type="radio" value="Delete" name="crud" onChange={(e) => setSection(e.target.value)} checked={section === "Delete"}/> 
          </Col>
        </Row>
      </Container>

      {section === "Post" && <form onSubmit={handlePost}>
        <Container className="form-container">
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Date</label>
                <input type="datetime-local" onChange={(e) => setDateTime(e.target.value)} required/> 
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Classification</label>
                <select name="LV" onChange={(e) => setClass(e.target.value)} required>
                  <option value="">Select a Classification</option>
                  {uniqueClass.map(classLevel => {
                    return <option value={classLevel}>{classLevel}</option>
                  })}
                </select>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Vehicle</label>
                <select name="LV" onChange={(e) => setLvId(e.target.value)} required>
                  <option value="">Select a Launch Vehicle</option>
                  {uniqueLVs.map(vehicle => {
                    return <option value={uniqueLvId[uniqueLVs.indexOf(vehicle)]}>{vehicle}</option>
                  })}
                </select>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Status</label>
                <select name="LV" onChange={(e) => setStatus(e.target.value)} required>
                  <option value="">Select a Status</option>
                  {uniqueStatus.map(status => {
                    return <option value={status}>{status}</option>
                  })}
                </select>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Site</label>
                <select name="LS" onChange={(e) => setSiteId(e.target.value)} required>
                  <option value="">Select a Launch Site</option>
                  {uniqueSites.map(site => {
                    return <option value={uniqueSiteId[uniqueSites.indexOf(site)]}>{site}</option>
                  })}
                </select>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Service Provider</label>
                <select name="LSP" onChange={(e) => setLsp(e.target.value)} required>
                  <option value="">Select a Launch Service Provider</option>
                  {uniqueLSPs.map(lsp => {
                    return <option value={lsp}>{lsp}</option>
                  })}
                </select>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Orbit</label>
                <select name="orbit" onChange={(e) => setOrbit(e.target.value)} required>
                  <option value="">Select an Orbit</option>
                  {uniqueOrbits.map(orbit => {
                    return <option value={orbit}>{orbit}</option>
                  })}
                </select>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Customer</label>
                <input type="text" onChange={(e) => setPayloadCustomer(e.target.value)} required/>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Mission</label>
                <input type="text" onChange={(e) => setPayloadMission(e.target.value)} required/>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Description</label>
                <input type="text" onChange={(e) => setPayloadDesc(e.target.value)} required/>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col className="form-col">
              <button className="crud-button" type="submit">Add</button>
            </Col>
          </Row>
        </Container>
      </form>}

      {section === "Update" && <form onSubmit={handlePatch}>
      <Container className="form-container">
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Date</label>
                <input type="datetime-local" value={dt ? dt.slice(0,16) : undefined} onChange={(e) => setDateTime(e.target.value)}/>
              </div> 
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Classification</label>
                <select name="LV" onChange={(e) => setClass(e.target.value)}>
                  <option value={cls}>{cls}</option>
                  {uniqueClass.map(classLevel => {
                    return <option value={classLevel}>{classLevel}</option>
                  })}
                </select>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Vehicle</label>
                <select name="LV" onChange={(e) => setLvId(e.target.value)}>
                  <option value={uniqueLvId[uniqueLVs.indexOf(vname)]}>{vname}</option>
                  {uniqueLVs.map(vehicle => {
                    return <option value={uniqueLvId[uniqueLVs.indexOf(vehicle)]}>{vehicle}</option>
                  })}
                </select>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Status</label>
                <select name="LV" onChange={(e) => setStatus(e.target.value)}>
                  <option value={stat}>{stat}</option>
                  {uniqueStatus.map(status => {
                    return <option value={status}>{status}</option>
                  })}
                </select>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Site</label>
                <select name="LS" onChange={(e) => setSiteId(e.target.value)}>
                  <option value={uniqueSiteId[uniqueSites.indexOf(sname)]}>{sname}</option>
                  {uniqueSites.map(site => {
                    return <option value={uniqueSiteId[uniqueSites.indexOf(site)]}>{site}</option>
                  })}
                </select>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Service Provider</label>
                <select name="LSP" onChange={(e) => setLsp(e.target.value)}>
                  <option value={l_s_p}>{l_s_p}</option>
                  {uniqueLSPs.map(lsp => {
                    return <option value={lsp}>{lsp}</option>
                  })}
                </select>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Orbit</label>
                <select name="orbit" onChange={(e) => setOrbit(e.target.value)}>
                  <option value={orb}>{orb}</option>
                  {uniqueOrbits.map(orbit => {
                    return <option value={orbit}>{orbit}</option>
                  })}
                </select>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Customer</label>
                <input type="text" value={pcus} onChange={(e) => setPayloadCustomer(e.target.value)}/>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Mission</label>
                <input type="text" value={pmis} onChange={(e) => setPayloadMission(e.target.value)}/>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Description</label>
                <input type="text" value={pdes} onChange={(e) => setPayloadDesc(e.target.value)}/>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col className="form-col">
              <button className="crud-button" type="submit">Update</button>
            </Col>
          </Row>
        </Container>
      </form>}
      
      {section === "Delete" && <form onSubmit={handleDelete}>
      <Container className="form-container">
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Date</label>
                <input type="datetime-local" value={dt ? dt.slice(0,16) : null}/>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Classification</label>
                <input type="text" value={cls}/>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Vehicle</label>
                <input type="text" value={vname}/>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Status</label>
                <input type="text" value={stat}/>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Site</label>
                <input type="text" value={sname}/>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Launch Service Provider</label>
                <input type="text" value={l_s_p}/>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Orbit</label>
                <input type="text" value={orb}/>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Customer</label>
                <input type="text" value={pcus}/>
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Mission</label>
                <input type="text" value={pmis}/>
              </div>
            </Col>
            <Col xs="12" md="6" className="form-col">
              <div className="input-wrapper">
                <label>Payload Description</label>
                <input type="text" value={pdes}/>
            </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col className="form-col">
              <button className="crud-button" type="submit">Delete</button>
            </Col>
          </Row>
        </Container>
      </form>}
    </div>
  );
}
  
export default Crud;