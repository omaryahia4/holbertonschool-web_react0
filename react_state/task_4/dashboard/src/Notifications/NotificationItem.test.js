import NotificationItem from "./NotificationItem";
import React from 'react';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<NotificationItem />);
});
