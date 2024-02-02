import {
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/uiActionTypes";

// Defining the initial state for the reducer
export const initialState = {
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
};

// create a reducer that takes the initial state as our state and the action object
const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      // when action type is DISPLAY_NOTIFICATION_DRAWER the reducer returns our initial with isNotificationDrawerVisible state set to true
      return {
        ...state,
        isNotificationDrawerVisible: true,
      };

    // when action type is HIDE_NOTIFICATION_DRAWER action theb reducer returns the initial state with isNotificationDrawerVisible state set to false

    case HIDE_NOTIFICATION_DRAWER:
      return {
        ...state,
        isNotificationDrawerVisible: false,
      };
    // when action type is LOGIN_SUCCESS action theb reducer returns the initial state with  isUserLoggedIn state set to true

    case LOGIN_SUCCESS:
      return {
        ...state,
        isUserLoggedIn: true,
      };

    // when action type is LOGIN_FAILURE action theb reducer returns the initial state with  isUserLoggedIn state set to false
    case LOGIN_FAILURE:
      return {
        ...state,
        isUserLoggedIn: false,
      };

    // when action type is LOGOUT action theb reducer returns the initial state with  isUserLoggedIn state set to false
    case LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false,
      };
    // otherwise the reducer returns the unchanged state
    default:
      return state;
  }
};

export default uiReducer;
