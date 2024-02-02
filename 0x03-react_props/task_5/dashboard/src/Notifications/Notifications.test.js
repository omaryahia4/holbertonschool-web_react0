import React from 'react';
import { shallow } from 'enzyme';
import Notifications  from './Notifications';


describe('Notifications', () => {
  //test that Notifications renders without crashing
  test('renders without crashing', () => {
    shallow(<Notifications />);
  });

  //check that the menu item is being displayed when displayDrawer is false
  it('displays the menu item when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('.menuItem')).toHaveLength(1);
  });

  //check that the div.Notifications is not being displayed when displayDrawer is false
  it('does not display the notifications div when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('div.Notifications')).toHaveLength(0);
  });

  //check that the menu item is being displayed when displayDrawer is true
  it('displays the menu item when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find('div.menuItem')).toHaveLength(1);
  });

  //check that the div.Notifications is being displayed when displayDrawer is true
  it('displays the notifications div when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find('div.Notifications')).toHaveLength(1);
  });

   // Add a new test to verify that Notifications renders correctly if you pass an empty array or if you don’t pass the listNotifications property
   it('renders correctly if listNotifications is empty or not passed', () => {
    const wrapper = shallow(<Notifications listNotifications={[]} />);
    expect(wrapper.find('NotificationItem')).toHaveLength(0);
    wrapper.setProps({ listNotifications: null });
    expect(wrapper.find('NotificationItem')).toHaveLength(0);
  }); 

  // Add a new test to verify that when you pass a list of notifications, the component renders it correctly and with the right number of NotificationItem
  it('renders the correct number of NotificationItem components', () => {
    const listNotifications = [        
      { id: 1, title: 'Notification 1' },
      { id: 2, title: 'Notification 2' },
      { id: 3, title: 'Notification 3' }    
    ];
    const wrapper = shallow(<Notifications listNotifications={listNotifications} />);
    expect(wrapper.find('NotificationItem')).toHaveLength(3);
  });

  // Add a new test to verify that when listNotifications is empty the message Here is the list of notifications is not displayed, but No new notification for now is
  it('displays No new notification for now when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications listNotifications={[]} />);
    expect(wrapper.find('div.Notifications p').text()).toEqual('No new notification for now');
  });

});