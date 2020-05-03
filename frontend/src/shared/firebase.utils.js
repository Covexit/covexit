import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAfYT2dHqMV6u1BH-SkCXVnq21Grn5UEFU",
    authDomain: "covexits.firebaseapp.com",
    databaseURL: "https://covexits.firebaseio.com",
    projectId: "covexits",
    storageBucket: "covexits.appspot.com",
    messagingSenderId: "1082731915468",
    appId: "1:1082731915468:web:477adef506818cbb4bfa69",
    measurementId: "G-LY1M9C1ZPY"
};

// Initialize Firebase
firebase.initializeApp(config);
// firebase.analytics();

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage(); // use default browser language
provider.setCustomParameters({ prompt: 'select_account' });

// sign in with a pop-up window
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;