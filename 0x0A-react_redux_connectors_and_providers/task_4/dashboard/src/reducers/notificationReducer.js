import { Map } from "immutable";

import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from "../actions/notificationActionTypes";

import notificationsNormalizer from "../schema/notifications";

export const initialNotificationState = {
  notifications: [],
  filter: "DEFAULT",
};


const notificationReducer = (state = Map(initialNotificationState), action) => {
  switch (action.type) {
    // we normalize notification data and we set the key isRead to false
    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);

      Object.keys(normalizedData.notifications).map((key) => {
        normalizedData.notifications[key].isRead = false;
      });
      // we return the state merged with new notification data
      return state.merge(normalizedData);

    case MARK_AS_READ:
      return state.setIn(
        ["notifications", String(action.index), "isRead"],
        true
      );

    case SET_TYPE_FILTER:
      return state.set("filter", action.filter);

    default:
      return state;
  }
};

export default notificationReducer;
