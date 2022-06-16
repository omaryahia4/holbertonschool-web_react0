import React from 'react'
import Closeicon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes, {bool} from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import { StyleSheet, css } from 'aphrodite';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listNotifications: this.props.listNotifications,
    };
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.listNotifications.length !==
        nextState.listNotifications.length ||
      this.props.displayDrawer !== nextProps.displayDrawer
    );
  }

  render() {
     const { displayDrawer, handleDisplayDrawer, handleHideDrawer } =
       this.props;
       if (this.state.listNotifications.length === 0) {
        if (!displayDrawer) {
          return (
            <div className={css(styles.notificationsMenu)}>
              <div className={css(styles.menuItem)}>
                <p onClick={() => handleDisplayDrawer()}>Your notifications</p>
              </div>
              <div className={css(styles.notificationsStyle)}>
                <p>No new notifications for now</p>
              </div>
            </div>
          );
        }
        else {
          return (
            <div className={css(styles.notificationsMenu)}>
              <div className={css(styles.menuItem)}>
                <p onClick={() => handleDisplayDrawer()}>Your notifications</p>
              </div>
            </div>
          );
        }
      } else {
         if (displayDrawer) {
          return (
            <div className={css(styles.notificationsStyle)}>
              <p>Here is the list of notifications</p>
              <ul>
                {this.state.listNotifications.map(({ id, type, value, html }) => (
                  <NotificationItem
                    key={id}
                    type={type}
                    value={value}
                    html={html}
                  />
                ))}
              </ul>

              <button
                aria-label='Close'
                type='button'
                onClick={() => handleHideDrawer()}
                className={css(styles.buttonStyle)}
              >
                <img
                  src={Closeicon}
                  alt='close-icon'
                  className={css(styles.imageStyle)}
                />
              </button>
            </div>
          );
         }
         else {
          return (
            <div className={css(styles.notificationsMenu)}>
              <div className={css(styles.menuItem)}>
                <p onClick={() => handleDisplayDrawer()}>Your notifications</p>
              </div>
            </div>
          );
         }
      }
}
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {return},
  handleHideDrawer: () => {return},
};

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'left',
  },
  notificationsMenu: {
    display: 'flex',
    flexDirection: 'column'

  },
  notificationsStyle: {
    position: 'relative',
    border: 'dotted',
    borderColor: 'crimson',
    marginBottom: '1rem',
    width: '70%',
    fontFamily: 'sans-serif',
    padding: '3px',
  },

  passwordStyle: {
    margin: '0.5rem',
    fontWeight: 'bold',
  },

  buttonStyle: {
    position: 'absolute',
    maxHeight: '12px',
    right: '5%',
    top: '1rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },

  imageStyle: {
    position: 'absolute',
    cursor: 'pointer',
    maxHeight: '17px',
    background: 'transparent',
    border: 'none',
  },
});

export default Notifications
