import React from 'react'
import PropTypes from 'prop-types';

export default function CourseListRow(props) {
  const isHeader = props.isHeader;
  const textFirstCell = props.textFirstCell;
  const textSecondCell = props.textSecondCell;

  const rowStyle = {
    backgroundColor: '#f5f5f5ab'
  };

  const headerStyle = {
    backgroundColor: '#deb5b545',
  };

  if (isHeader) {
      if (!textSecondCell) {
          return (
            <tr style={rowStyle}>
              <th colSpan={2}>{textFirstCell}</th>
            </tr>
          );
      }
      if (textSecondCell != null) {
          return (
            <tr>
              <th style={headerStyle}>{textFirstCell}</th>
              <th style={headerStyle}>{textSecondCell}</th>
            </tr>
          );
      }
  }
  else {
      <td>{textFirstCell} {textSecondCell}</td>
  }
}
CourseListRow.prototype = {
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};