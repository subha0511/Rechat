import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCo3riAzXFtT0Kouv0V0rCg_Je4quKNRzU",
  authDomain: "my-chat-22711.firebaseapp.com",
  projectId: "my-chat-22711",
  storageBucket: "my-chat-22711.appspot.com",
  messagingSenderId: "938531807692",
  appId: "1:938531807692:web:16c380f2ede9541dd53d69",
  measurementId: "G-1CMEQV3DL4",
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
