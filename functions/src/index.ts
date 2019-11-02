import * as functions from 'firebase-functions';

import * as mongoose from 'mongoose';

let isConnected: any;

const connection = () => {
    
    if (isConnected) {
        return Promise.resolve();
    }

    
    //   TODO .env
    return mongoose
        .connect('mongodb://dbAdmin:dqDIhjGzdQUDT7NG@cluster0-shard-00-00-8fbcu.gcp.mongodb.net:27017,cluster0-shard-00-01-8fbcu.gcp.mongodb.net:27017,cluster0-shard-00-02-8fbcu.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true }) 
        .then((db: any) => {
            isConnected = db.connections[0].readyState;
        });
}


const test = new mongoose.Schema({
    name: String
  });

const Test = mongoose.model('Test', test);


export const helloWorld = functions.https.onRequest((request, response) => {
    return connection()
    .then(() => {
        return new Test({name: 'bla'}).save()
    })
    .then(() => response.send("Hello from Firebase!"));
});
