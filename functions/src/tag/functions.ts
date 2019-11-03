import * as functions from 'firebase-functions';;
import Connection from '../connection';
import Tag from './Tag';
import onRequest from '../functions/onRequest';


export const createTag = onRequest((request: functions.Request, response: functions.Response) => {
    const name = request.body.name;
    
    const entity = new Tag({
        name
    });

    return Connection.connect()
        .then(() => entity.save())
        .then(result => response.status(200).send(result));
});

export const searchTag = onRequest((request: functions.Request, response: functions.Response) => {
    const query = request.query.name;

    const regex = new RegExp(`^${query}`);
    return  Connection.connect()
        .then(() =>  Tag.find({ name: { $regex: regex }}).limit(10).sort({'name': -1}))
        .then(result =>  response.send(result));
});
