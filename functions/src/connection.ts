import * as mongoose from 'mongoose';

export default class Connection {
    static isConnected =  0;
    
    static connect =  () => {
        const isConnected = !!mongoose.connection.readyState;

        if (isConnected) return Promise.resolve()

        const url = 'mongodb://dbAdmin:dqDIhjGzdQUDT7NG@cluster0-shard-00-00-8fbcu.gcp.mongodb.net:27017,cluster0-shard-00-01-8fbcu.gcp.mongodb.net:27017,cluster0-shard-00-02-8fbcu.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
    
        return mongoose
            .connect(url, { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }) 
            .then((db: any) => db);
    }
}