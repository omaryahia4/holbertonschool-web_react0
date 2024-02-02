module.exports = {
    'moduleNameMapper': {
      '^react-dom((\\/.*)?)$': 'react-dom-16$1',
      '^react((\\/.*)?)$': 'react-16$1'
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  }