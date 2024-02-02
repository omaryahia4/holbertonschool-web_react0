import React from 'react';
import Notifications from '../Notifications/Notifications.js';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { StyleSheet, css } from 'aphrodite';
import MyContext from './AppContext.js';

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
    super(props);
    this.state = {
      displayDrawer: true,
      user: { email: '', password: '', isLoggedIn: false },
      logOut: () => this.logOut,
      listNotifications: listNotifications,
    };
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this),
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

  logIn(email, password) {
    this.setState({ user: { email, password, isLoggedIn: true } });
  }

  logOut() {
    this.setState({ user: { email: '', password: '', isLoggedIn: false } });
  }

  markNotificationAsRead(id) {
    this.handleDisplayDrawer()
    this.setState({listNotifications:
      this.state.listNotifications.filter((notif) => {
        return notif.id !== id;
      })
  });
  }

  render() {
    return (
      <MyContext.Provider
        value={{ user: this.state.user, logOut: this.logOut }}
      >

        <React.Fragment>
          <div className={css(styles.headerStyle)}>
            <Notifications
              displayDrawer={this.state.displayDrawer}
              listNotifications={this.state.listNotifications}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
              markNotificationAsRead={this.markNotificationAsRead}
            />
            <div>
              <Header />
            </div>
          </div>
          {this.state.user.isLoggedIn ? (
            <>
              <div>
                <BodySectionWithMarginBottom title='Course list'>
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
              </div>
              <div className={css(styles.footerStyle)}>
                <Footer />
              </div>
            </>
          ) : (
            <>
              <div className={css(styles.bodyStyle)}>
                <div className={this.props}>
                  <BodySectionWithMarginBottom title='Log in to continue'>
                    <Login logIn={this.logIn} />
                  </BodySectionWithMarginBottom>
                  <BodySection title='News from the School'>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum
                    </p>
                  </BodySection>
                </div>
              </div>
              <div className={css(styles.footerStyle)}>
                <Footer />
              </div>
            </>
          )}
        </React.Fragment>
      </MyContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    color: '#e0454b',
    padding: '10px'
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
  displayDrawer: false,
  isLoggedIn: false,
  logOut: () => {
    return;
  },
};

App.propTypes = {
  displayDrawer: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;
