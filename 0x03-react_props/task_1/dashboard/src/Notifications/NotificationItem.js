import React from 'react'

export default function NotificationItem(props) {

      return props.html ? (
        <li
          dangerouslySetInnerHTML = {{ __html: props.html.__html }}
          data = {props.type}
        ></li>
      ) : (
        <li data = {props.type}>{props.value}</li>
      );
}
