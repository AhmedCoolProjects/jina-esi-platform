import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyCjbbRCspzcDfs1bt04t0PPAvGi07tCdfU",
  authDomain: "jinaesiplatform.firebaseapp.com",
  projectId: "jinaesiplatform",
  storageBucket: "jinaesiplatform.appspot.com",
  messagingSenderId: "431133891420",
  appId: "1:431133891420:web:578c2d17183402ddc63f99",
  measurementId: "G-MDY1NR4P5V",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const storage = firebase.storage();
export { storage };
export default firebaseAuth;
