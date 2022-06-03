import { getFullYear, getFooterCopy, getLatestNotification } from './utils.js';

it('should equal 2022', () => {
  expect(getFullYear()).toBe(2022);
});

it('should equal Holberton School if true', () => {
  expect(getFooterCopy(true)).toBe('Holberton School');
});

it('should return <strong>Urgent requirement</strong> - complete by EOD', () => {
  expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD'              );
});