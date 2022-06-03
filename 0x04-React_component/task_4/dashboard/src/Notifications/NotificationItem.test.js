import NotificationItem from "./NotificationItem";

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<NotificationItem />);
});
