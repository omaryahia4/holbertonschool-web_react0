import { Map } from "immutable";

export const filterTypeSelected = (state) => {
  return state.get("filter");
};

export const getNotifications = (state) => {
  let notifs = state.get('notifications');
  return Map(notifs);
};

export const getUnreadNotifications = (state) => {
  const notifications = state.get("notifications");
  const filtered = notifications.filter(
    (value, key) => value.get("isRead") === false
  );
  return Map(filtered);
};
