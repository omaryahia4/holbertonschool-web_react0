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
    };
    this.logOut = props.logOut;
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
          <Notifications listNotifications={listNotifications} />
          <div className={css(styles.headerStyle)}>
            <Header />
          </div>
          <div className={css(styles.bodyStyle)}>
            <BodySectionWithMarginBottom title='Log in to continue'>
              <Login />
            </BodySectionWithMarginBottom>

            <BodySection title='News from the School'>
              <p>You can find all school News here !</p>
            </BodySection>
          </div>
          <div className={css(styles.footerStyle)}>
            <Footer />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Notifications />
          <div className={css(styles.headerStyle)}>
            <Header />
          </div>
          <div className={css(styles.bodyStyle)}>
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
