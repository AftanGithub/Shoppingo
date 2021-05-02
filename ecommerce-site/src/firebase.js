// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyC9pzL2eV52JJuUDaBQHK14HSAmYxGFn88",
    authDomain: "ecommerce-site-66269.firebaseapp.com",
    projectId: "ecommerce-site-66269",
    storageBucket: "ecommerce-site-66269.appspot.com",
    messagingSenderId: "4753172393",
    appId: "1:4753172393:web:8f8b8a048e4160992546b8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuth = new firebase.auth.GoogleAuthProvider();
  
