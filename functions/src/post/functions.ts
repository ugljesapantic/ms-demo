import * as functions from 'firebase-functions';;
import Connection from '../connection';
import Post from './Post';
import onRequest from '../functions/onRequest';
import { auth } from '../config';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

export const createPost = onRequest((request: functions.Request, response: functions.Response) => {
    const entity = new Post(request.body);

    return Connection.connect()
        .then(() => entity.save())
        .then(result => response.status(200).send(result));
});

export const searchPost  =  onRequest(async (request: functions.Request, response: functions.Response)  => {
    const query: any = {
        createdAt: { $lt: new Date(request.query.from) }
    };
    // TODO send percent encoding frontend side array=a&array=b&array=c
    if (request.query.tags) query.tags = { $in: request.query.tags.split(',') }

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