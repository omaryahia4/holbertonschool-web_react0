import { StyleSheet, css } from 'aphrodite';
import React from 'react';
export default function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <label className={css(styles.emailStyle)}>Email:</label>
      <input type='email' />
      <label className={css(styles.passwordStyle)}>Password:</label>
      <input type='password' />
      <button className={css(styles.passwordStyle)}>OK</button>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  style: {
    borderTop: 'solid',
    borderBottom: 'solid',
    borderColor: '#e0454b',
    minHeight: '50vmax',
    padding: '30px',
  },
  emailStyle: {
    marginRight: '0.5rem',
    fontWeight: 'bold',
  },

  passwordStyle: {
    margin: '0.5rem',
    fontWeight: 'bold',
  },
});
