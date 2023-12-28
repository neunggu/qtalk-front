module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'search.pstatic.net',
      'randomuser.me',
      //aws
      'abc.s3.ap-northeast-2.amazonaws.com',
      's3.ap-northeast-2.amazonaws.com'
    ]
  },
  env:{
    USER_IMAGE_BASE_URL:'https://s3.ap-northeast-2.amazonaws.com/abc',
    SSO_URL:'http://localhost:7777',
    CHAT_API_URL:'http://localhost:8888',
    SOCKET_ADDRESS:'ws://localhost:8001',

    FIREBASE_API_KEY: "firebase api key",
    FIREBASE_AUTH_DOMAIN: "firebase auth domain",
    FIREBASE_PROJECT_ID: "firebase project id",
    FIREBASE_STORAGE_BUCKET: "firebase storeage bucket",
    FIREBASE_MESSAGING_SENDER_ID: "firebase messaging sender id",
    FIREBASE_APP_ID: "firebase app id",
    MEASUREMENT_ID: "firebase measurement id",
    VAPID_KEY:"firebase vapid key",
  }
}
