import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkbonwOCwZ2oXwJs8DbhmHjkqt35zaljc",
  authDomain: "teachatbot2024.firebaseapp.com",
  projectId: "teachatbot2024",
  storageBucket: "teachatbot2024.appspot.com",
  messagingSenderId: "541851876776",
  appId: "1:541851876776:android:a47d35c9733223d27a319d"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };