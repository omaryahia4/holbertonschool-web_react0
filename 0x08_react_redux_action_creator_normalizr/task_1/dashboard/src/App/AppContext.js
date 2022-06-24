import React from 'react';

const user = {
  email: 'abc@gmail.com',
  password: 'abc',
  isLoggedIn: false,
};

const logOut = () => {};

const MyContext = React.createContext(user, logOut);

export default MyContext