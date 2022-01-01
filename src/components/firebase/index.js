import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO4rR-rbD2s-7NQxqWUyEJSc9mg8QcGo0",
  authDomain: "soical-meadia.firebaseapp.com",
  projectId: "soical-meadia",
  storageBucket: "soical-meadia.appspot.com",
  messagingSenderId: "874331264015",
  appId: "1:874331264015:web:baa0a7fb0c4c83ea61ff7a",
  measurementId: "G-3JX6P9FR19"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };