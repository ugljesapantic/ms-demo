import * as mongoose from 'mongoose';

// Shared npm module would be nice
const post = new mongoose.Schema({
    content: String,
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

export default mongoose.model('Post', post);
