import React from 'react'
import PropTypes from 'prop-types';

export default function CourseListRow(props) {
  const isHeader = props.isHeader;
  const textFirstCell = props.textFirstCell;
  const textSecondCell = props.textSecondCell;
  if (isHeader) {
      if (!textSecondCell) {
          return (
            <tr>
              <th colSpan={2}>{textFirstCell}</th>
            </tr>
          );
      }
      if (textSecondCell != null) {
          return (
            <tr>
              <th>{textFirstCell}</th>
              <th>{textSecondCell}</th>
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