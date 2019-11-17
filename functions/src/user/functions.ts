import { getUserId } from './../utils';
import * as functions from 'firebase-functions';;
import Connection from '../connection';
import User from './User';
import onRequest from '../functions/onRequest';

export const createUser = onRequest((request: functions.Request, response: functions.Response) => {
    const entity = new User(request.body);

    return Connection.connect()
        .then(() => entity.save())
        .then(result => response.status(200).send(result));
});

export const getSelf = onRequest(async (request: functions.Request, response: functions.Response) => {
    const userId = await getUserId(request);
    await Connection.connect();
    const user = await User.findOne({id: userId});
    return response.status(200).send(user);
});

export const updateSelf = onRequest(async (request: functions.Request, response: functions.Response) => {
    const userId = await getUserId(request);
    await Connection.connect();
    const user = await User.updateOne({id: userId}, {$set: request.body});
    return response.status(200).send(user);
});


export const updateUser = onRequest((request: functions.Request, response: functions.Response) => {
    const id = request.query.id;
    const body = request.body;

    return  Connection.connect()
        .then(() =>  User.updateOne({_id: id}, {$set: body}))
        .then(result =>  response.send(result));
});
