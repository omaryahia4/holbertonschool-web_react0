import React from 'react';
import { shallow } from 'enzyme';
import Notifications  from './Notifications';




describe('Notifications', () => {
  //test that Notifications renders without crashing
  test('renders without crashing', () => {
    shallow(<Notifications />);
  });

  //verify that Notifications renders three NotificationItem elements
  test('renders three NotificationItem elements', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('NotificationItem').length).toBe(3);
  });

  //verify that Notifications renders the text "Here is the list of notifications"
  test('renders the text "Here is the list of notifications"', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('p').text()).toBe('Here is the list of notifications');
  });

  //verify that the first NotificationItem element renders the right html
  test('first NotificationItem element renders the right html', () => {
    const wrapper = shallow(<Notifications />);
  expect(wrapper.find('NotificationItem').first().html()).toBe(
      '<li data-priority="default">New course available</li>'
    );
  });
});