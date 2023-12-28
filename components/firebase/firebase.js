import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from 'react-toastify';
import localforage from "localforage";

const Msg = ({title, sender, body}) => (
  <div>
    {title}
    <div>{sender}: {body}</div>
  </div>
)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
const vapidKey = process.env.VAPID_KEY;
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firebaseCloudMessaging = {
    tokenInlocalforage: async () => {
      const token = await localforage.getItem("fcm_token");
      console.log("fcm_token tokenInlocalforage", token);
      return token;
    },
    onMessage: async () => {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        Notification.requestPermission(function(result) {
          if (result === 'granted') {
            toast(<Msg title={payload.data.title} sender={payload.data.sender} body={payload.data.body}/>);
          }
        });
      });
    },
    init: async function () {
      try {
        if ((await this.tokenInlocalforage()) !== null) {
          console.log("it already exists");
          return false;
        }
        console.log("it is creating it.");
        const messaging = getMessaging(app);
        await Notification.requestPermission();
        getToken(messaging, {
          vapidKey,
        }).then((currentToken) => {
            console.log("current Token", currentToken);
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // save the token in your database
              localforage.setItem("fcm_token", currentToken);
              console.log("fcm_token", currentToken);
            } else {
              // Show permission request UI
              console.log(
                "NOTIFICACION, No registration token available. Request permission to generate one."
              );
              // ...
            }
          })
          .catch((err) => {
            console.log(
              "NOTIFICACIONAn error occurred while retrieving token . "
            );
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },
  };
  
  export { firebaseCloudMessaging };