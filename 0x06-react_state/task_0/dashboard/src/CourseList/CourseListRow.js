import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default function CourseListRow(props) {
  const isHeader = props.isHeader;
  const textFirstCell = props.textFirstCell;
  const textSecondCell = props.textSecondCell;

  if (isHeader) {
    if (!textSecondCell) {
      return (
        <tr className={css(styles.headerRow)}>
          <th colSpan={2}>{textFirstCell}</th>
        </tr>
      );
    }
    if (textSecondCell != null) {
      return (
        <tr>
          <th className={css(styles.headerStyle)}>{textFirstCell}</th>
          <th className={css(styles.headerStyle)}></th>
        </tr>
      );
    }
  } else {
    <td>
      {textFirstCell} {textSecondCell}
    </td>;
  }
}

const styles = StyleSheet.create({
  rowStyle: {
    backgroundColor: '#f5f5f5ab',
  },

  headerStyle: {
    backgroundColor: '#deb5b545',
  },
});

CourseListRow.prototype = {
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
