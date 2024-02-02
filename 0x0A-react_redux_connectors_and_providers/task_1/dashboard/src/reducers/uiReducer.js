import { Map } from "immutable";

import {
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/uiActionTypes";

export const initialState = {
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
};
// update our reducer to pass an immutable Map as state
const uiReducer = (state = Map(initialState), action) => {
  switch (action.type) {
    // if action type is DISPLAY_NOTIFICATION_DRAWER we set the isNotificationDrawerVisible from the Map to true
    case DISPLAY_NOTIFICATION_DRAWER:
      return state.set("isNotificationDrawerVisible", true);

    // if action type is HIDE_NOTIFICATION_DRAWER we set the isNotificationDrawerVisible from the Map to false
    case HIDE_NOTIFICATION_DRAWER:
      return state.set("isNotificationDrawerVisible", false);

     // if action type is LOGIN_SUCCESS we set the isUserLoggedIn from the Map to true
    case LOGIN_SUCCESS:
      return state.set("isUserLoggedIn", true);

    // if action type is LOGIN_FAILURE we set the isUserLoggedIn from the Map to false
    case LOGIN_FAILURE:
      return state.set("isUserLoggedIn", false);

     // if action type is LOGOUT we set the isUserLoggedIn from the Map to false
    case LOGOUT:
      return state.set("isUserLoggedIn", false);

     // otherwise the reducer returns the unchanged state
    default:
      return state;
  }
};

export default uiReducer;
