import { auth } from './config';
import * as functions from 'firebase-functions';

export const getUserId = async (request: functions.Request) => {
    const token = request.query.token;
    const decoded = await auth.verifyIdToken(token);
    return decoded.uid;
}