import firebase from '../config/firebaseConfig';

export const getFirebase = () => firebase;

export const getFirestore = () => firebase.firestore();