import Login from './Login';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Login />);
});

it('renders 2 inputs and 2 labels', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('input').length).toBe(2);
  expect(wrapper.find('label').length).toBe(2);
});

