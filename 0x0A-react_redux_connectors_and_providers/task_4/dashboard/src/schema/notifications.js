import * as notificationsData from "../../notifications.json" ;
import { normalize, schema } from "normalizr";

const user = new schema.Entity("users");

const message = new schema.Entity(
  "messages",
  {},
  {
    idAttribute: "guid",
  }
);

const notification = new schema.Entity("notifications", {
  author: user,
  context: message,
});

const normalizedData = normalize(notificationsData.default, [notification]);

export { normalizedData };

export function getAllNotificationsByUser(userId) {
  const notifications = normalizedData.entities.notifications;
  const messages = normalizedData.entities.messages;

  const notificationsByUser = [];

  for (const property in notifications) {
    if (notifications[property].author === userId) {
      notificationsByUser.push(messages[notifications[property].context]);
    }
  }

  return notificationsByUser;
}

const notificationsNormalizer = (data) => {
  const normalizedData = normalize(data, [notification]);

  return normalizedData.entities;
};

const notifications = [
  {
    id: 1,
    isRead: false,
    type: "default",
    value: "New course available",
  },
  {
    id: 2,
    isRead: false,
    type: "urgent",
    value: "New resume available",
  },
  {
    id: 3,
    isRead: false,
    type: "urgent",
    value: "New data available",
  },
]

console.log(notificationsNormalizer(notifications).notifications)

export default notificationsNormalizer;
