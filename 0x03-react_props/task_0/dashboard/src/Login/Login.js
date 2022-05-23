import React from 'react'
import './Login.css'
export default function Login() {
  return (
    <React.Fragment>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
        <label className='email'>Email:</label>
        <input type='email' />
        <label className='password'>Password:</label>
        <input type='password' />
        <button className='label-button'>OK</button>
      </div>
    </React.Fragment>
  );
}
