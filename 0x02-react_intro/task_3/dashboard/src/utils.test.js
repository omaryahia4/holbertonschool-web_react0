import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

it('should equal 2023', () => {
  expect(getFullYear()).toBe(2023);
});

it('should equal Holberton School if true', () => {
  expect(getFooterCopy(true)).toBe('Holberton School');
});

it('should return <strong>Urgent requirement</strong> - complete by EOD', () => {
  expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD');
});
