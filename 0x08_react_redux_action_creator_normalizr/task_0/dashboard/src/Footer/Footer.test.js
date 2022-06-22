import Footer from "./Footer";
import { shallow } from 'enzyme';
import React from 'react';

it('renders without crashing', () => {
  shallow(<Footer />);
});

it('should equal Copyright if false', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.getFooterCopy(false)).toBe('Copyright');
});
