import * as notificationsList from '../../../notifications.json' assert {type: 'json'};
export default function getAllNotificationsByUser(userId) {  
  for (const notif in notificationsList) {
    const arr = []
    for (let i = 0; i < notificationsList[notif].length; i++) {
        if (notificationsList[notif][i].id === userId || notificationsList[notif][i].author.id === userId
             ) {
            arr.push(notificationsList[notif][i].context)
        }
    }
    return arr
  }
}
