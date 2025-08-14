var admin = require("firebase-admin");

var serviceAccount = require("path/rumedia-b4dda-firebase-adminsdk-fbsvc-cd56bd62ae.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rumedia-b4dda-default-rtdb.firebaseio.com"
});

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB20vvK27H7gPkj-154AO5KVgHCMIVLOnU",
    authDomain: "rumedia-b4dda.firebaseapp.com",
    databaseURL: "https://rumedia-b4dda-default-rtdb.firebaseio.com/",
    projectId: "rumedia-b4dda",
    storageBucket: "rumedia-b4dda.firebasestorage.app",
    messagingSenderId: "682873671218",
    appId: "1:682873671218:web:1ff1427711be2b1591362b",
    measurementId: "G-RJBHBD9FRY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);