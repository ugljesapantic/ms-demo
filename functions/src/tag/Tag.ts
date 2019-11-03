import * as mongoose from 'mongoose';

const tag = new mongoose.Schema({
    name: {type : String, text: true}
});

tag.index({name: 'text'})

export default mongoose.model('Tag', tag);
