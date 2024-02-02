import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';

//checks for the component named CourseList
describe('<CourseList />', () => {
  //Tests if CourseList component renders without crashing 
    it('renders without crashing', () => {
      const wrapper = shallow(<CourseList />);
      expect(wrapper.exists()).toEqual(true);
    });
    
  //Tests if CourseList renders 5 different rows
    it('renders 5 different rows', () => {
      const wrapper = shallow(<CourseList />);
      expect(wrapper.find('CourseListRow')).toHaveLength(5);
    });
});


//if you pass an empty array or if you don’t pass the listCourses property
describe('Tests correct render of CourseList when passing an empty listCourses', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CourseList listCourses={[]} />);
  });

  //test that CourseList shows "No courses available yet" when passed an empty listCourses
  it('displays "No courses available yet"', () => {
    expect(wrapper.containsMatchingElement(<td>No courses available yet</td>)).toEqual(true);
  });

  //test that CourseList does not render any CourseListRow when passed an empty listCourses
  it('does not render any CourseListRow', () => {
    expect(wrapper.find('CourseListRow')).toHaveLength(0);
  });
});

//if you do not pass an empty array or if you do pass the listCourses property
describe('Tests correct render of CourseList when passing a list of courses', () => {
  let wrapper;
  const listCourses = [    { id: 1, name: 'ES6', credit: 60 },    { id: 2, name: 'Webpack', credit: 20 },    { id: 3, name: 'React', credit: 40 },  ];
  beforeEach(() => {
    wrapper = shallow(<CourseList listCourses={listCourses} />);
  });
  //test that CourseList correctly renders the number of courses passed in the listCourses prop
  it('renders the correct number of courses', () => {
    expect(wrapper.find('CourseListRow')).toHaveLength(listCourses.length);
  });
  //test that CourseList correctly displays the name and credit of each course passed in the listCourses prop
  it('displays the name and credit of each course correctly', () => {
    listCourses.forEach((course, index) => {
    expect(wrapper.find('CourseListRow').at(index).props().textFirstCell).toEqual(course.name);
    expect(wrapper.find('CourseListRow').at(index).props().textSecondCell).toEqual(course.credit);
    });
    });
    });
    
    //no listCourses prop
    describe('Tests correct render of CourseList when passing no listCourses prop', () => {
    let wrapper;
    beforeEach(() => {
    wrapper = shallow(<CourseList />);
    });
    //test that CourseList correctly renders the message "No courses available yet"
    it('displays the message "No courses available yet" when no listCourses prop is passed', () => {
      expect(wrapper.find('CourseListRow').props().textFirstCell).toEqual("No courses available yet");
    });
    });
 