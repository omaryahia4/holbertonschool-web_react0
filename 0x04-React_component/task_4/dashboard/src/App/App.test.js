import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders div with the class App-header', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('div.App-header').length).toBe(1);
});

it('renders div with the class App-body', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('div.App-body').length).toBe(1);
});

it('renders div with the class App-footer', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('div.App-footer').length).toBe(1);
});
