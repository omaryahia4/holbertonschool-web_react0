import Footer from "./Footer";
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Footer />);
});

it('should equal Copyright if false', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.getFooterCopy(false)).toBe('Copyright');
});
