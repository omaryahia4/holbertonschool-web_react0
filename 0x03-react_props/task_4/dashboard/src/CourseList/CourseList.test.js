import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';

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