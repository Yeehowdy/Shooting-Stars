import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'cookie';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Calender from './views/calendar/calender.js'
import Home from './views/home/home.js'
import Login from './views/login/login.js'
import Metrics from './views/metrics/metrics.js'
import Navbar from './views/navbar.js'
import PageNotFound from './views/404';


export const LoginContext = React.createContext();
export const LaunchesContext = createContext();

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)
  const [users, setUsers] = useState({})
  const [launches, setLaunches] = useState([])
  const [trigger, setTrigger] = useState(true)

  useEffect(() => {
    if(cookie.parse(document.cookie).LoggedIn){
      fetch('http://localhost:8080/launches-join', {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        // console.log('fetch data from App:\n', data.message)
        if(data.message === 'YOU SHALL NOT PASS'){
          document.cookie = "LoggedIn=; expires=0";
          setLoggedIn(false)
          navigate('/login')
        }
        else{
          setLaunches(data)
          // console.log('launches from App:\n', launches)
        }
      })
    }
    else{
      navigate('/login')
    }
  }, [loggedIn, trigger])

  return (
    <>
      <LoginContext.Provider value={{loggedIn, setLoggedIn, users, setUsers}}>
      <LaunchesContext.Provider value={{launches, trigger, setTrigger}}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/calendar" element={<Calender />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </LaunchesContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default App;