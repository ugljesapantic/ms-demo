import * as functions from 'firebase-functions';;
import Connection from '../connection';
import Tag from './Tag';

export const createTag = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
    const name = request.body.name;
    
    const entity = new Tag({
        name
    });

    return Connection.connect()
        .then(() => entity.save())
        .then(result => response.status(200).send(result));
});

export const searchTag = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
    const query = request.body.query;

    const regex = new RegExp(`^${query}`);
    return  Connection.connect()
        .then(() =>  Tag.find({ name: { $regex: regex }}).limit(10).sort({'name': -1}))
        .then(result =>  response.send(result));
});
