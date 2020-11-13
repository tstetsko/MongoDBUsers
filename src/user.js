const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer then 2 charecters.'
        },
        required:[true, 'Name is required.']
    },
    likes: Number,
    posts : [PostSchema]
});

UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});
const User = mongoose.model('user', UserSchema);
module.exports = User;
