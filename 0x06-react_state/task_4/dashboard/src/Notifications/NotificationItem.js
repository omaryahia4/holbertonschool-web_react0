import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends React.Component {
  constructor(props) {
    super(props)
    this.html = props.html;
    this.type = props.type;
    this.value = props.value;
    this.markAsRead = props.markAsRead;
    this.iD = props.iD
  }
  render() {
    return this.html ? (
      <li dangerouslySetInnerHTML={{__html: this.html.__html}} data={this.type} className={this.type === 'default' ? css(styles.defaultData) : css(styles.urgentData) }></li>
    ) : (
      <li
        className={this.type === 'default' ? css(styles.defaultData) : css(styles.urgentData)}
        data={this.type}
        onClick={() => {
          this.markAsRead(this.iD);
        }}
      >
        {this.value}
      </li>
    );
  }
      
}

NotificationItem.propTypes = {
  iD: PropTypes.number,
  type: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  value: '',
  markAsRead: () => {},
};

const styles = StyleSheet.create({
  defaultData: {
    color: 'blue'
  },
  urgentData: {
    color: 'red'
  }
})

export default NotificationItem
