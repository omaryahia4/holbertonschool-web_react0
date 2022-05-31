import React from 'react';
import './App.css';
import Notifications from '../Notifications/Notifications.js';
import Header from '../Header/Header.js';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';
import CourseList from '../../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = props.isLoggedIn;
    this.listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];
    this.listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { getLatestNotification } },
    ];
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
    if (!this.isLoggedIn) {
      return (
        <React.Fragment>
          <Notifications listNotifications={this.listNotifications} />
          <div className='App'>
            <Header />
          </div>
          <div className='App-body'>
            <BodySectionWithMarginBottom title='Log in to continue'>
              <Login />
            </BodySectionWithMarginBottom>

            <BodySection title='News from the School'>
              <p>You can find all school News here !</p>
            </BodySection>
          </div>
          <div className='App-footer'>
            <Footer />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Notifications />
          <div className='App'>
            <Header />
          </div>
          <div className='App-body'>
            <BodySectionWithMarginBottom title='Course list'>
              <CourseList listCourses={this.listCourses} />
            </BodySectionWithMarginBottom>
          </div>
          <div className='App-footer'>
            <Footer />
          </div>
        </React.Fragment>
      );
    }
  }
}

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
