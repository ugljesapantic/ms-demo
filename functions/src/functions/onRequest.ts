import * as functions from 'firebase-functions';;
import * as cors from 'cors';

const withCors = cors({
    origin: true,
});

export default (callback: Function) => 
    functions.https.onRequest((request: functions.Request, response: functions.Response) => 
        withCors(request, response, () => callback(request, response))
    );
