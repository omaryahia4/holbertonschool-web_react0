import React from 'react'
import PropTypes from 'prop-types';

export default function NotificationItem(props) {
      const html = props.html;
      const type = props.type;
      const value = props.value;
      NotificationItem.propTypes = {
        html: PropTypes.exact({
          key: PropTypes.html,
          value: PropTypes.string
        }),
        type: PropTypes.string,
        value: PropTypes.string
      }
      return html ? (
        <li
          dangerouslySetInnerHTML = {{ __html: html.__html }}
          data = {type}
        ></li>
      ) : (
        <li data = {type}>{value}</li>
      );
}
