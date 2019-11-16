import * as mongoose from 'mongoose';

const user = new mongoose.Schema({
    firstname: String,
    lastname: String,
    id: String,
    email: String,
});

export default mongoose.model('User', user);
