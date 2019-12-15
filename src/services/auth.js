import { fbAuth } from "../App";
import http from "../utils/http";

export const signUp = user => {
    return fbAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(response => {
            response.user && response.user.sendEmailVerification();
            return response;
        })
        .then(resp => 
            resp.user.updateProfile({
                displayName: `${user.firstname} ${user.lastname}`,
        })
        .then(() => resp.user.uid))
        .then(id => http('createUser', 'POST', null, {
            id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
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