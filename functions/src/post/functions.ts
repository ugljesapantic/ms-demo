import * as functions from 'firebase-functions';;
import Connection from '../connection';
import Post from './Post';
import onRequest from '../functions/onRequest';
import { auth } from '../config';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

export const createPost = onRequest((request: functions.Request, response: functions.Response) => {
    // TODO find more elegant way
    const filteredObject = request.body;
    Object.keys(filteredObject).forEach((key) => (filteredObject[key] == null) && delete filteredObject[key]);
    const entity = new Post(filteredObject);

    return Connection.connect()
        .then(() => entity.save())
        .then(result => response.status(200).send(result));
});

export const searchPost = onRequest(async (request: functions.Request, response: functions.Response)  => {
    const {from, tags, type, subType} = request.query;
    const query: any = {
        $and: [{
            createdAt: { $lt: new Date(from) }
        }]
    };
    // TODO send percent encoding frontend side array=a&array=b&array=c
    if (tags) query.$and.push({tags: { $in: tags.split(',') }})
    if (type) query.$and.push({type: {$eq: type}})
    if (subType) query.$and.push({subType: {$eq: subType}})
    

    console.log(query);
    await Connection.connect();
    const result = await Post.find(query).limit( 10 ).sort('-createdAt');
    // Fix this any thingy
    const users = await Promise.all(result.map((post: any) => auth.getUser(post.userUid)));
    const resultWithUserInfo = result.map((post: any) => {
        const {displayName, uid} = users.find(user => user.uid === post.userUid) as UserRecord;
        return {...post.toObject(), user: displayName, userUid: uid}
    })
    return response.send(resultWithUserInfo);
});

export const getPost = onRequest(async (request: functions.Request, response: functions.Response)  => {
    const {id} = request.query;
    const query: any = {
        _id: id
    }

    console.log(query);
    await Connection.connect();
    const result = await Post.findOne(query);
    console.log(result);
    // Fix this any thingy
    // const user = await auth.getUser(result.userUid) as UserRecord;
    // const resultWithUserInfo = {...post.toObject(), user: displayName, userUid: uid}

    return response.send(result);
});