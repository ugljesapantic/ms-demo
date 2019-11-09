import * as functions from 'firebase-functions';;
import Connection from '../connection';
import Post from './Post';
import onRequest from '../functions/onRequest';


export const createPost = onRequest((request: functions.Request, response: functions.Response) => {
    const entity = new Post(request.body);

    return Connection.connect()
        .then(() => entity.save())
        .then(result => response.status(200).send(result));
});

export const searchPost = onRequest((request: functions.Request, response: functions.Response) => {
    const query = request.query.name;

    const regex = new RegExp(`^${query}`);
    return  Connection.connect()
        .then(() =>  Post.find({ name: { $regex: regex }}).limit(10).sort({'name': -1}))
        .then(result =>  response.send(result));
});
