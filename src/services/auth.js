import { getFirestore, getFirebase } from "../utils/firebase";

export const signUp = user => {
    return getFirebase()
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(resp => {
            return getFirestore()
                .collection('users')
                .doc(resp.user.uid)
                .set({
                    firstName: user.firstname,
                    lastName: user.lastname
                });
        })
}

export const signIn = ({email, password}) => {
    return getFirebase()
        .auth()
        .signInWithEmailAndPassword(email, password)
}

export const signOut = () => {
    return getFirebase()
        .auth()
        .signOut()
}