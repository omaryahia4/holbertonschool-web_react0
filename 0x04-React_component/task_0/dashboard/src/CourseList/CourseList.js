import React from 'react';
import CourseListRow from './CourseListRow';
import './CourseList.css';
import CourseShape from './CourseShape';
import PropTypes from 'prop-types';

export default function CourseList (props) {
  const listCourses = props.listCourses;
  if (!listCourses.length) {
    return (
      <table id='CourseList'>
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
      <table id='CourseList'>
        <thead>
          <CourseListRow textFirstCell='Available courses' isHeader='true' />
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
CourseList.prototype = {
  listCourses: PropTypes.arrayOf(CourseShape.prototype),
};
CourseList.defaultProps = {
  listCourses: []
}
