import * as mongoose from 'mongoose';

// Shared npm module would be nice
const post = new mongoose.Schema({
    content: String,
    tags: [mongoose.Schema.Types.ObjectId],
    partner: Boolean,
    type: ['SUPPLY', 'DEMAND'],
    sub_type: ['INVESTOR', 'JOB']
});

export default mongoose.model('Post', post);
