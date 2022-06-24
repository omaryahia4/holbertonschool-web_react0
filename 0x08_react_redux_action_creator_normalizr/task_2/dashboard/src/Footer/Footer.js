import React from 'react'
import { getFullYear, getFooterCopy } from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';
import MyContext from '../App/AppContext';

export default function Footer() {
  const {user} = React.useContext(MyContext)
  if (user.isLoggedIn) {
    return (
      <div className='App-footer'>
        <p>
          Copyright {getFullYear()} - {getFooterCopy(true)}
        </p>
        <p>
          <a>Contact us</a>
        </p>
      </div>
    );
  }
  else {
    return (
      <div className='App-footer'>
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>
    </div>
    )
  };
}
