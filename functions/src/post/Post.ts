import * as mongoose from 'mongoose';

const post = new mongoose.Schema({
    content: String,
    tags: [mongoose.Schema.Types.ObjectId]
});

export default mongoose.model('Post', post);
