const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.fcmSend = functions.database.ref('/messages/{userId}/{messageId}').onCreate(event => {


  const message = event.after.val()
  const userId  = event.params.userId

  const payload = {
        notification: {
          title: message.title,
          body: message.body,
          icon: "https://placeimg.com/250/250/people"
        }
      };


   admin.database()
        .ref(`/fcmTokens/${userId}`)
        .once('value')
        .then(token => token.val() )
        .then(userFcmToken => {
          return admin.messaging().sendToDevice(userFcmToken, payload)
        })
        .then(res => {
          console.log("Sent Successfully", res);
        })
        .catch(err => {
          console.log(err);
        });

});


// curl https://fcm.googleapis.com/fcm/send \
// -H"Content-Type: application/json" \
//   -H"Authorization: key=AAAAJs-uFyU:APA91bE5qXs2TR6D1K05aOOqTLDgTIXKBtPFy0mObFXvdaGd9c1IzbApyB-cjDIjLD71qYkSnY9ljkkfLGYGwOcgHOHG-sGuQhqD5OVLXYvkGOnW4tFKm_7D7QGzKW_XluX_FnrfhRFG" \
// -d '{ "notification": { "title": "Nueva Feature!", "body": "Hay nuevas features","icon":"https://url-de-tu-icono", "click_action": "http://www.platzi.com"}, "to" : "..."
// }'