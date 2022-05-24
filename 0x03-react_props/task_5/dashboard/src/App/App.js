import React from 'react';
import './App.css';
import Notifications from '../Notifications/Notifications.js';
import Header from '../Header/Header.js';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';
import CourseList from '../../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

function App(props) {
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
  const isLoggedIn = props.isLoggedIn;
  if (!isLoggedIn) {
    return (
      <React.Fragment>
        <Notifications listNotifications={listNotifications} />
        <div className='App'>
          <Header />
        </div>
        <div className='App-body'>
          <Login />
        </div>
        <div className='App-footer'>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
  else {
    return (
      <React.Fragment>
        <Notifications />
        <div className='App'>
          <Header />
        </div>
        <div className='App-body'>
          <CourseList listCourses = {props.listCourses} />
        </div>
        <div className='App-footer'>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
App.defaultProps = {
  isLoggedIn: false,
};
App.propTypes = {
  isLoggedIn: PropTypes.bool,
};
export default App;
