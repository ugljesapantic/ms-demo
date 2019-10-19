import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBPcfIQDccdt89UbF50ssNshmTgy_j3oD0",
    authDomain: "ms-demo-f173d.firebaseapp.com",
    databaseURL: "https://ms-demo-f173d.firebaseio.com",
    projectId: "ms-demo-f173d",
    storageBucket: "ms-demo-f173d.appspot.com",
    messagingSenderId: "868535169240",
    appId: "1:868535169240:web:243f45b1e34f954197a7ad",
    measurementId: "G-MVV25S3JW0"
};

firebase.initializeApp(firebaseConfig);

export default firebase;