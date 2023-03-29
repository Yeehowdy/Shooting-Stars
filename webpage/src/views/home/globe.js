import React, { useRef, useEffect, useState } from 'react';
import './globe.css';
import mapboxgl from 'mapbox-gl'; 
import {Container,Row,Button} from 'react-bootstrap';
mapboxgl.accessToken = 'pk.eyJ1IjoibW5pY2tsZTU1IiwiYSI6ImNsZm4xNHFzbDBoa240MXBpcGViZmh6ZmgifQ.t_UHaO7Qb3vKGRLF23s2iw';

const Globe = ({selectedLaunch}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [launchSites,setLaunchSites] = useState(null)


  const handleHome = () => {
    map.current.flyTo({
      center: [-98, 36],
      zoom: 1.25,
      bearing: 0,
      pitch: 0,
      essential: true
      });
  }

  //useEffect to get launch sites from api.
  useEffect(() => {
    fetch('http://localhost:8080/table/launch_site',{
      credentials: 'include'
    })
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(data => {
        setLaunchSites(data)
      })
      .catch(error => {
        console.log("Error fetching data: ", error)
      })
    },[]);

    //create globe
    useEffect(() => {
      if (!mapContainer.current || !launchSites) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-98, 36],
        zoom: 1.25
        })
        .addControl(new mapboxgl.FullscreenControl())
        .addControl(new mapboxgl.NavigationControl())

        const markers = launchSites.map(site=> new mapboxgl.Marker({
          draggable: false})
          .setLngLat([site.lon,site.lat])
          .setPopup(new mapboxgl.Popup()
          .setText(`${site.name}`))
          .addTo(map.current))
      },[launchSites]);

    //map fly to launch site when launch selected on home page
    useEffect(()=>{
      if(!selectedLaunch || !launchSites) return;
        let ID = selectedLaunch.site_id
        let copy = [...launchSites]
        let result = copy.filter(site=>site.id===ID)
        map.current.flyTo({
        center: [result[0].lon, result[0].lat],
        zoom: 11,
        duration: 5000,
        bearing: 100,
        pitch: 75,
        essential: true
        });
    },[selectedLaunch])

      return (
          <Container className='py-2 map-wrapper'>
            <Row className='justify-content-center'>
              <div ref={mapContainer} className="map-container" />
            </Row>
            <Button onClick={()=>handleHome()}variant='light' className='reset-btn'>Home</Button>
          </Container>
        );
}

export default Globe