import React from 'react';
import {LoginContext} from '../../App.js';
import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'cookie';
import { Container } from 'react-bootstrap';

function Login() {
  const {loggedIn, setLoggedIn, users, setUsers} = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let LoggedIn = cookie.parse(document.cookie).LoggedIn
    if(LoggedIn){
      navigate('/')
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    let found = false;
    // console.log('email:\n',email)
    // console.log('password:\n',password)
    fetch('http://localhost:8080/login', {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      // console.log('fetch data from login:\n', data)
      if(data.message == 'Logged in successfully'){
        document.cookie = 'LoggedIn=True; max-age=1*1*60' // expires in 6 hours
        document.cookie = `user=${data.user}; max-age=6*60*60`
        let cookies = cookie.parse(document.cookie)
        // console.log('cookie from login:\n', cookies)
        setLoggedIn(true)
        navigate('/')
      }
    })
    .catch(err => {
      console.log('err:\n', err)
    })

  };

  return (
    <Container className='loginDiv'>
      <form className='loginForm' onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="email_field">Email address</label>
          <input type="email" name="email" id="email_field" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
         
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password_field">Password</label>
          <input type="password" name="password" id="password_field" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
          
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4 loginButton">Sign in</button>
      </form>
    </Container>
  );
}

export default Login;