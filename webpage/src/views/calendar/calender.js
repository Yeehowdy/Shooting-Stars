import React, { useContext, useState }  from 'react'
import { LaunchesContext } from '../../App';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Crud from './crud';
import { Container } from 'react-bootstrap';

moment.locale("LLL");
const localizer = momentLocalizer(moment)

const Calender = () => {
  const {launches} = useContext(LaunchesContext);

  const [launchID, setLaunchID] = useState(null);
  const [payloadID, setPayloadId] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [classification, setClass] = useState(null);
  const [lvId, setLvId] = useState(null);
  const [status, setStatus] = useState(null);
  const [siteId, setSiteId] = useState(null);
  const [siteName, setSiteName] = useState(null);
  const [lsp, setLsp] = useState(null);
  const [orbit, setOrbit] = useState(null);
  const [payloadCustomer, setPayloadCustomer] = useState(null);
  const [payloadMission, setPayloadMission] = useState(null);
  const [payloadDesc, setPayloadDesc] = useState(null);
  const [vehicleName, setVehicleName] = useState(null);

  const handleSelect = (event) => {
    setLaunchID(event.launch_id)
    setPayloadId(event.payload_id)
    setDateTime(event.date_time)
    setClass(event.payload_classification)
    setLvId(event.lv_id)
    setStatus(event.status)
    setSiteId(event.site_id)
    setLsp(event.lsp)
    setOrbit(event.orbit)
    setPayloadCustomer(event.payload_customer)
    setPayloadMission(event.payload_mission)
    setPayloadDesc(event.payload_description)
    setSiteName(event.site_name)
    setVehicleName(event.launch_vehicle)
  }


  const events = launches.map(event => {
    return {
      title: event.payload_mission, 
      start: new Date (event.date_time),
      end:new Date (event.date_time),
      launch_id: event.launch_id,
      payload_id: event.payload_id,
      site_id: event.site_id,
      lv_id: event.lv_id,
      lsp: event.lsp,
      orbit: event.orbit,
      date_time: event.date_time,
      status: event.status,
      site_name: event.site_name,
      launch_vehicle: event.launch_vehicle,
      payload_customer: event.payload_customer,
      payload_mission: event.payload_mission,
      payload_description: event.payload_description,
      payload_classification: event.payload_classification,
    }
  })
   
  if (launches){
    return (
      <>
        <Container className="calendarDiv py-3">
          <div style={{ height: 700 }}>
            <Calendar
              selectable={true}
              localizer={localizer}
              events={events}
              step={60}
              defaultDate={new Date()}
              popup={false}
              onSelectEvent={(event) => handleSelect(event)}
              onShowMore={(events, date) => this.setState({ showModal: true, events })}
            />
          </div>
        </Container>
        <Crud 
          lid={launchID} 
          pid={payloadID}
          dt={dateTime}
          cls={classification}
          LV_Id={lvId}
          vname={vehicleName}
          stat={status}
          sid={siteId}
          sname={siteName}
          l_s_p={lsp}
          orb={orbit}
          pcus={payloadCustomer}
          pmis={payloadMission}
          pdes={payloadDesc}
        />
      </>
    )
  }
}

export default Calender;