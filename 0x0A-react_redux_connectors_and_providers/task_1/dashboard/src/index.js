import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import uiReducer, { initialState } from "./reducers/uiReducer";

const store = createStore(uiReducer, Map(initialState));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
