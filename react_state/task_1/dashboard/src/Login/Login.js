import { StyleSheet, css } from 'aphrodite';
import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: props.email || '',
      password: props.password || '',
      enableSubmit: false
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit() {
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
     if (this.state.email && this.state.password) {
      this.setState({ enableSubmit: true });
     }
       
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
    if (this.state.email && this.state.password) {
      this.setState({ enableSubmit: true });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={css(styles.responsiveStyle)}>
          <p>Login to access the full dashboard</p>
          <form onSubmit={this.handleLoginSubmit } >
            <div className={css(styles.inputStyle)}>
              <label className={css(styles.emailStyle)}>Email:</label>
              <input
                type='email'
                defaultValue={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </div>

            <div className={css(styles.inputStyle)}>
              <label className={css(styles.passwordStyle)}>Password:</label>
              <input
                type='password'
                defaultValue={this.state.password}
                onChange={this.handleChangePassword}
              />
            </div>

            <div className={css(styles.inputStyle)}>
              <input
                value='OK'
                disabled={!this.state.enableSubmit}
                type='submit'
                className={css(styles.passwordStyle)}
              />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
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
