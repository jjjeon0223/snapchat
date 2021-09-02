import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyArGXvejb2OYvZWYvV7oFYRcuHRbpJiZbc",
  authDomain: "snapchat-f4993.firebaseapp.com",
  projectId: "snapchat-f4993",
  storageBucket: "snapchat-f4993.appspot.com",
  messagingSenderId: "177502629549",
  appId: "1:177502629549:web:81c2a4b4e2c629b6402024",
  measurementId: "G-NPYZSWP7QY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

const firebaseExports = { db, auth, storage, provider };

export default firebaseExports;
