import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import HolbertonLogo from '../assets/HolbertonLogo.jpg';
import MyContext from '../App/AppContext';

export default function Header() {
  const {user, logOut} = React.useContext(MyContext)
      if (user.isLoggedIn) {
        return (<div className={css(styles.style)}>
          <img
            className={css(styles.logo)}
            src={HolbertonLogo}
            alt='logo'
          ></img>
          <h1>School dashboard</h1>

          <section id='logoutSection'>
            <p>
              Welcome {user.email} <a onClick={logOut}>(logout)</a>
            </p>
          </section>
        </div>)
      }
      else {
        return (
        <div className={css(styles.style)}>
          <img
            className={css(styles.logo)}
            src={HolbertonLogo}
            alt='logo'
          ></img>
          <h1>School dashboard</h1>
        </div>
        )
      }
    
  }

const styles = StyleSheet.create({
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    color: '#e0454b'
  },
  logo: {
    height: '30vmin'
  }
});
