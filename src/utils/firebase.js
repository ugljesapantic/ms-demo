import firebase from '../config/firebaseConfig';


export const withUserUid = obj => ({
    ...obj,
    userUid: firebase.auth().currentUser.uid
})

export const withCreatedAt = obj => ({
    ...obj,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
})

export const getTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

export const getIncrement = () => firebase.firestore.FieldValue.increment(1);

export const USER_UID = 'userUid';
export const CREATED_AT = 'createdAt';
export const USER_NAME = 'user';

const ENHANCER = {
    [USER_UID]: () => firebase.auth().currentUser.uid,
    [USER_NAME]: () => firebase.auth().currentUser.displayName,
    [CREATED_AT]: () => firebase.firestore.FieldValue.serverTimestamp()
}

export const enhanceWith = (obj, ...enhancers) => {
    const update = enhancers.reduce((ac, x) => ({...ac, [x]: ENHANCER[x]()}), {});
    return ({...obj, ...update})
}

export const querySnapshotToArray = snapshot => {
    const sum = [];
    snapshot.forEach(x => sum.push({
        ...x.data(),
        id: x.id
    }))
    return sum;
}