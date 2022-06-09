import { StyleSheet, css } from 'aphrodite';
import React from 'react';
export default function Login() {
  return (
    <React.Fragment>
      <div className={css(styles.responsiveStyle)}>
        <p>Login to access the full dashboard</p>
        <div className={css(styles.inputStyle)}>
          <label className={css(styles.emailStyle)}>Email:</label>
          <input type='email' />
        </div>

        <div className={css(styles.inputStyle)}>
          <label className={css(styles.passwordStyle)}>Password:</label>
          <input type='password' />
        </div>

        <div className={css(styles.inputStyle)}>
          <button className={css(styles.passwordStyle)}>OK</button>
        </div>
      </div>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  responsiveStyle: {
    '@media only screen and (max-width: 900px)': {
      flexDirection: 'row',
    },
  },
  emailStyle: {
    marginRight: '0.5rem',
    fontWeight: 'bold',
  },

  passwordStyle: {
    margin: '0.5rem',
    fontWeight: 'bold',
  },

  inputStyle: {
    display: 'inline',
    '@media only screen and (max-width: 900px)': {
      display: 'block',
    },
  },
});
