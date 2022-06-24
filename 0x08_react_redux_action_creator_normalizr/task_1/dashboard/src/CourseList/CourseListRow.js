import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default function CourseListRow(props) {
  const isHeader = props.isHeader;
  const textFirstCell = props.textFirstCell;
  const textSecondCell = props.textSecondCell;
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };


  if (isHeader) {
    if (!textSecondCell) {
      return (
        <tr className={css(styles.headerRow)}>
          <th colSpan={2}>{textFirstCell}</th>
        </tr>
      );
    }
    if (textSecondCell) {
      return (
        <tr>
          <th className={css(styles.headerStyle)}>{textFirstCell}</th>
          <th className={css(styles.headerStyle)}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr className={checked ? css(styles.rowChecked) : ''}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        {textFirstCell} 
        <td>
          {textSecondCell}
        </td>
    </tr>)
  }
}

const styles = StyleSheet.create({
  rowStyle: {
    backgroundColor: '#f5f5f5ab',
  },

  headerStyle: {
    backgroundColor: '#deb5b545',
  },

  rowChecked: {
    backgroundColor: '#e6e4e4'
  }
});

CourseListRow.prototype = {
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
