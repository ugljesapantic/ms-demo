import * as functions from 'firebase-functions';;
import Connection from '../connection';
import User from './User';
import onRequest from '../functions/onRequest';
import { auth } from '../config';


export const createUser = onRequest((request: functions.Request, response: functions.Response) => {
    const entity = new User(request.body);

    return Connection.connect()
        .then(() => entity.save())
        .then(result => response.status(200).send(result));
});

export const getSelf = onRequest(async (request: functions.Request, response: functions.Response) => {
    const token = request.query.token;
    const decoded = await auth.verifyIdToken(token);
    await Connection.connect();
    const user = await User.findOne({id: decoded.uid});
    return response.status(200).send(user);
});

export const updateUser = onRequest((request: functions.Request, response: functions.Response) => {
    const id = request.query.id;
    const body = request.body;

    return  Connection.connect()
        .then(() =>  User.updateOne({_id: id}, {$set: body}))
        .then(result =>  response.send(result));
});
