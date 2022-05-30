import React from 'react'
import './Notifications.css'
import Closeicon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';

export default function Notifications(props) {
  const displayDrawer = props.displayDrawer;
  const listNotifications = props.listNotifications;
  if (displayDrawer) {
    return (
      <>
        <div className='menuItem'>Your notifications</div>
        <div className='Notifications'>
          {listNotifications.length ? (
            <React.Fragment>
              <p>Here is the list of notifications</p>
              <ul>
                {listNotifications.map(({ id, type, value, html }) => (
                  <NotificationItem
                    key={id}
                    type={type}
                    value={value}
                    html={html}
                  />
                ))}
              </ul>
            </React.Fragment>
          ) : (
            <p>No new notifications for now</p>
          )}
          <button
            aria-label='Close'
            type='button'
            onClick={() => console.log('Close button has been clicked')}
            style={{
              position: 'absolute',
              right: '5px',
              top: '40px',
              cursor: 'pointer',
              maxHeight: '17px',
              background: 'transparent',
              border: 'none',
            }}
          >
            <img
              src={Closeicon}
              alt='close-icon'
              style={{
                position: 'relative',
                maxHeight: '12px',
                background: 'transparent',
                border: 'none',
              }}
            />
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='menuItem'>Your notifications</div>
      </>
    );
  }
    
}
Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};