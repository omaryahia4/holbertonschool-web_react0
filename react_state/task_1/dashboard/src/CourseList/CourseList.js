import React from 'react';
import CourseListRow from './CourseListRow';
import CourseShape from './CourseShape';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default function CourseList (props) {
  const listCourses = props.listCourses;
  if (!listCourses.length) {
    return (
      <table id='CourseList' className={css(styles.style)}>
        <thead>
          <CourseListRow textFirstCell='Available courses' isHeader='true' />
        </thead>
        <tbody>
          <CourseListRow
            textFirstCell='No course available yet'
            isHeader='false'
          />
        </tbody>
      </table>
    );
  }
  else {
    return (
      <table id='CourseList' className={css(styles.style)}>
        <thead >
          <CourseListRow textFirstCell='Available courses' isHeader='true' />
        </thead>
        <thead className={css(styles.textAligning)}>
          <CourseListRow
            textFirstCell='Course name'
            textSecondCell='Credit'
            isHeader='true'
          />
        </thead>
        <tbody>
          {listCourses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
              isHeader={false}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

const styles = StyleSheet.create({
  style: {
    marginLeft: 'auto',
    marginRight: 'auto',
    border: 'groove',
    width: '100%'
  },
  textAligning: {
    textAlign: 'left'
  }
});

CourseList.prototype = {
  listCourses: PropTypes.arrayOf(CourseShape.prototype),
};
CourseList.defaultProps = {
  listCourses: []
}
