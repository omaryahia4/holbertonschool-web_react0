import React from 'react'
import Closeicon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import { StyleSheet, css } from 'aphrodite';

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: props.displayDrawer,
      listNotifications: props.listNotifications
    }
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    if (this.state.displayDrawer) {
      return (
        <>
          <div className={css(styles.menuItem)}>Your notifications</div>
          <div className={css(styles.notificationsStyle)}>
            {this.state.listNotifications.length ? (
              <React.Fragment>
                <p>Here is the list of notifications</p>
                <ul>
                  {this.state.listNotifications.map(
                    ({ id, type, value, html }) => (
                      <NotificationItem
                        key={id}
                        type={type}
                        value={value}
                        html={html}
                        markAsRead={this.markAsRead}
                      />
                    )
                  )}
                </ul>
              </React.Fragment>
            ) : (
              <p>No new notifications for now</p>
            )}
            <button
              aria-label='Close'
              type='button'
              onClick={() => console.log('Close button has been clicked')}
              className={css(styles.buttonStyle)}
            >
              <img
                src={Closeicon}
                alt='close-icon'
                className={css(styles.imageStyle)}
              />
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={css(styles.menuItem)}>Your notifications</div>
        </>
      );
    }
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

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
  },

  notificationsStyle: {
    border: 'dotted',
    borderColor: 'crimson',
    paddingLeft: '1rem',
    marginBottom: '1rem',
    width: '40%',
    marginLeft: '43rem',
    marginTop: '0.5rem',
  },

  passwordStyle: {
    margin: '0.5rem',
    fontWeight: 'bold',
  },

  buttonStyle: {
    position: 'relative',
    maxHeight: '12px',
    background: 'transparent',
    border: 'none',
  },
  imageStyle: {
    position: 'relative',
    maxHeight: '12px',
    background: 'transparent',
    border: 'none',
  },
});

export default Notifications
