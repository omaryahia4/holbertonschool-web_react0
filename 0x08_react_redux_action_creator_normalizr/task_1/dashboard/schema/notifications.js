import * as notificationsList from '../../../notifications.json' assert {type: 'json'};
import { normalize, schema } from 'normalizr';

export function getAllNotificationsByUser(userId) {
  return notificationsList.default
    .filter((item) => item.author.id === userId)
    .map(({ context }) => context);
}

const user = new schema.Entity("users");

const message = new schema.Entity(
  "messages", {},
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
