var admin = require("firebase-admin");
var serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://venue-booking-app-7b055-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const message = admin.messaging();

module.exports = { message }