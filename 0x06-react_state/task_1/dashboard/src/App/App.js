import React from 'react';
import Notifications from '../Notifications/Notifications.js';
import Header from '../Header/Header.js';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { StyleSheet, css } from 'aphrodite';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoggedIn: props.isLoggedIn || false,
      displayDrawer: true,
    };
    this.logOut = props.logOut;
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
  }

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  KeyDownHandler(event) {
    if (event.ctrlKey && event.key == 'h') {
      event.preventDefault();
      alert('Logging you out');
      this.logOut();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.KeyDownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.KeyDownHandler);
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <React.Fragment>
          <div className={css(styles.headerStyle)}>
            <Notifications
              listNotifications={listNotifications}
              displayDrawer={this.state.displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
            />
            <div>
              <Header />
            </div>
          </div>
          <div className={css(styles.bodyStyle)}>
            <div className={this.props}>
              <BodySectionWithMarginBottom title='Log in to continue'>
                <Login />
              </BodySectionWithMarginBottom>
              <BodySection title='News from the School'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </BodySection>
            </div>
          </div>
          <div className={css(styles.footerStyle)}>
            <Footer />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className={css(styles.headerStyle)}>
            <Notifications />
            <div>
            <Header />
            </div>
          </div>
          <div>
            <BodySectionWithMarginBottom title='Course list'>
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom>
          </div>
          <div className={css(styles.footerStyle)}>
            <Footer />
          </div>
        </React.Fragment>
      );
    }
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    display: 'inline-flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    color: '#e0454b',
  },

  bodyStyle: {
    borderTop: 'solid',
    borderBottom: 'solid',
    borderColor: '#e0454b',
    minHeight: '50vmax',
    padding: '30px',
    '@media only screen and (max-width: 900px)': {
      display: 'block',
    },
  },

  footerStyle: {
    display: 'flex',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
  },
});

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {
    return;
  },
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;
