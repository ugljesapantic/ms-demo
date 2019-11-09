import { fbAuth } from "../App";

export const signUp = user => {
    return fbAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(resp => resp.user.updateProfile({
            displayName: `${user.firstname} ${user.lastname}`,
        }))
}

export const signIn = ({email, password}) => {
    return fbAuth
        .signInWithEmailAndPassword(email, password)
}

export const signOut = () => {
    return fbAuth
        .signOut()
}