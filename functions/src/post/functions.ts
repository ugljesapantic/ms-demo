import * as functions from 'firebase-functions';
import Connection from '../connection';
import Post, { PostModel } from './Post';
import onRequest from '../functions/onRequest';
import { auth } from '../config';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { getUserId } from '../utils';

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
    const userId = await getUserId(request);
    const query: any = {
        $and: [{
            createdAt: { $lt: new Date(from) }
        }, {
            userUid: { $ne : userId }
        }]
    };
    // TODO send percent encoding frontend side array=a&array=b&array=c
    if (tags) query.$and.push({tags: { $in: tags.split(',') }});
    let adjustedType = type;

    if (type === 'DEMAND') adjustedType = 'SUPPLY';
    if (type === 'SUPPLY') adjustedType = 'DEMAND';

    if (type) query.$and.push({type: {$eq: adjustedType}});
    if (subType) query.$and.push({subType: {$eq: subType}})
    
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

    await Connection.connect();
    const result = await Post.findOne(query).populate('tags') as PostModel;
    const user = await auth.getUser(result.userUid);

    const resultWithUserInfo = {...result.toObject(), user: user.displayName, userUid: user.uid}

    return response.send(resultWithUserInfo);
});

export const getMyPosts = onRequest(async (request: functions.Request, response: functions.Response)  => {
    const userId = await getUserId(request);
    const query: any = {
        userUid:  userId 
    }

    await Connection.connect();
    const result = await Post.find(query).populate('tags') as [PostModel];
    const user = await auth.getUser(userId);

    const resultWithUserInfo = result.map((post: any) => {
        return {...post.toObject(), user: user.displayName, userUid: userId}
    })

    return response.send(resultWithUserInfo);
});