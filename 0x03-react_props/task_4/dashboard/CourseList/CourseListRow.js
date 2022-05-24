import React from 'react'

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
