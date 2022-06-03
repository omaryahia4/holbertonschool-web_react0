import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import HolbertonLogo from '../assets/HolbertonLogo.jpg';

export default function Header() {
  return (
    <div className={css(styles.style)}>
      <img className={css(styles.logo)} src={HolbertonLogo} alt='logo'></img>
      <h1>School dashboard</h1>
    </div>
  );
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
