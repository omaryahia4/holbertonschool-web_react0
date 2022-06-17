import { shallow } from 'enzyme';
import React from 'react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

it('BodySectionWithMarginBottom renders without crashing', () => {
  const wrapper = shallow(<BodySectionWithMarginBottom />);
  expect(wrapper.exists()).toEqual(true);
});

it('shallow the component should render correctly a BodySection component and that the props are passed correctly to the child component', () => {
  const wrapper = shallow(
    <BodySectionWithMarginBottom title='test title'>
      <p>test children node</p>
    </BodySectionWithMarginBottom>
  );

  const BodySection = wrapper.find('BodySection');

  expect(BodySection).toHaveLength(1);
  expect(BodySection.props().title).toEqual('test title');

  const internalBody = BodySection.dive();

  const h2 = internalBody.find('h2');
  const p = internalBody.find('p');

  expect(h2).toHaveLength(1);
  expect(h2.text()).toEqual('test title');

  expect(p).toHaveLength(1);
  expect(p.text()).toEqual('test children node');
});

it('BodySectionWithMarginBottom has correct class for style', () => {
  const wrapper = shallow(
    <BodySectionWithMarginBottom title='test title'>
      <p>test children node</p>
    </BodySectionWithMarginBottom>
  );

  const div = wrapper.find('.bodySectionWithMargin').first();

  expect(div.exists()).toEqual(true);
});
