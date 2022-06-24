import * as notificationsList from '../../../notifications.json' assert {type: 'json'};
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

const normalizedData = normalize(notificationsList.default, [notification]);

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
console.log(getAllNotificationsByUser("5debd764a7c57c7839d722e9"))
