import { getFirebase } from "../utils/firebase";

export const signUp = user => {
    return getFirebase()
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(resp => resp.user.updateProfile({
            displayName: `${user.firstname} ${user.lastname}`,
        }))
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