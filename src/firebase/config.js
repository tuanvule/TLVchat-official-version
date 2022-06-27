// import { initializeApp } from "firebase/app";
// import { analytics } from "firebase/analytics";
// import firebase from 'firebase'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

// const firebaseConfig = {
//   apiKey: "AIzaSyDpoeg_FXWnupOHbUwsP3gut86uV4gRDvc",
//   authDomain: "vchat-app2.firebaseapp.com",
//   projectId: "vchat-app2",
//   storageBucket: "vchat-app2.appspot.com",
//   messagingSenderId: "165768064291",
//   appId: "1:165768064291:web:28722854b74603342b3096",
//   measurementId: "G-F16M0SHSDX"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAqoLSfm0iCtzS4D2Z5obkXsyOJz0ZPRro",
  authDomain: "tlvchat-64a55.firebaseapp.com",
  projectId: "tlvchat-64a55",
  storageBucket: "tlvchat-64a55.appspot.com",
  messagingSenderId: "892561301203",
  appId: "1:892561301203:web:7296111ec9f6c3b427be26",
  measurementId: "G-JZLYXQLD4P"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// console.log(db)  

export { db, auth };
export default firebase; 