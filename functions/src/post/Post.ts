import * as mongoose from 'mongoose';

export interface PostModel extends mongoose.Document {
    description: string,
    title: string,
    tags: any,
    userUid: string,
    type: string,
    subType: string,
  };

// Shared npm module would be nice
const post = new mongoose.Schema({
    description: String,
    title: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    userUid: String,
    type: {
        type: String,
        enum: ['SUPPLY', 'DEMAND'],
        required: true
    },
    subType: {
        type: String,
        enum: ['JOB', 'INVESTOR', 'PARTNER'],
        required: false,
    },
}, {timestamps: true});

export default mongoose.model<PostModel>('Post', post);
