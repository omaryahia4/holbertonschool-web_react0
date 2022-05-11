import $ from 'jquery';
const _ = require('lodash');
import './body.css';

$('body').append('<button>Click here to get started</button>');
$('body').append('<p id="count"></p>');
$('button').on(
  'click',
  _.debounce(updateCounter, 300, {
    leading: true,
    trailing: false,
  })
);

let count = 0;
function updateCounter() {
  count++;
  $('#count').text(`${count} clicks on the button`);
}
