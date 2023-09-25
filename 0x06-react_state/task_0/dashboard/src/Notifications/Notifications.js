import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';


class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (nextProps.listNotifications.length > this.props.listNotifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer);
  }

  render() {
    const {
      displayDrawer,
      handleDisplayDrawer,
      handleHideDrawer,
      listNotifications
    } = this.props;

    return (
      <>
        <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
          <p className={css(styles.animationOpacity, styles.animationBounce)}>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications, styles.notificationsMobile)}>
            <button
              className={css(styles.buttonMobile)}
              style={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                fontSize: "1rem",
                border: "none",
                background: "none",
                cursor: "pointer"
              }}
              aria-label={"Close"}
              onClick={handleHideDrawer}
            >x</button>
            {listNotifications.length === 0 ? <p>No new notification for now</p> : <p>Here is the list of notifications</p>}
            <ul className={css(styles.ulMobile)}>
              {listNotifications.map((notification) => (
                <NotificationItem
                  id={notification.id}
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={this.markAsRead}
                />
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => { },
  handleHideDrawer: () => { },
};

const opacity = {
  from: {
    opacity: '.5',
  },
  to: {
    opacity: '1',
  },
};

const bounce = {
  '70%': {
    transform: 'translateY(0px)',
  },
  '85%': {
    transform: 'translateY(-5px)',
  },
  '100%': {
    transform: 'translateY(5px)',
  }
};

const styles = StyleSheet.create({
  notifications: {
    border: '2px dotted #e1484c',
    padding: '1rem .5rem 0 .5rem',
    position: 'fixed',
    right: '0',
    top: '0',
    backgroundColor: 'rgba(255, 248, 248, 1)',
  },
  menuItem: {
    textAlign: 'right',
    ':hover': {
      cursor: 'pointer'
    }
  },
  notificationsMobile: {
    '@media (max-width: 900px)': {
      fontSize: '20px',
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: '9999',
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
  buttonMobile: {
    '@media (max-width: 900px)': {
      top: '1rem',
    },
  },
  ulMobile: {
    '@media (max-width: 900px)': {
      padding: '0 !important',
    },
  },
  animationOpacity: {
    ':hover': {
      animationName: opacity,
      animationDuration: '1s',
      animationIterationCount: '3',
    },
  },
  animationBounce: {
    ':hover': {
      animationName: bounce,
      animationDuration: '0.5s',
      animationIterationCount: '3',
    },
  },
});

export default Notifications;
