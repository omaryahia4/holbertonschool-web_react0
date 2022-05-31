import React from 'react'
import PropTypes from 'prop-types';

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
      <li dangerouslySetInnerHTML={this.html} data={this.type}></li>
    ) : (
      <li
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
  html: PropTypes.exact({
  key: PropTypes.html,
  value: PropTypes.string
  }),
  type: PropTypes.string,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  iD: PropTypes.number
}

export default NotificationItem