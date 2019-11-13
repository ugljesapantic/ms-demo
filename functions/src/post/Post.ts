import * as mongoose from 'mongoose';

export interface PostModel extends mongoose.Document {
    description: string,
    title: string,
    tags: [mongoose.Schema.Types.ObjectId],
    userUid: string,
    type: string,
    subType: string,
  };

// Shared npm module would be nice
const post = new mongoose.Schema({
    description: String,
    title: String,
    tags: [mongoose.Schema.Types.ObjectId],
    userUid: String,
    type: {
        type: String,
        enum: ['SUPPLY', 'DEMAND', 'PARTNER'],
        required: true
    },
    subType: {
        type: String,
        enum: ['JOB', 'INVESTOR'],
        required: false,
    },
}, {timestamps: true});

export default mongoose.model<PostModel>('Post', post);
