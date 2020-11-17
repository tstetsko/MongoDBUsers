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
    posts : [PostSchema],
    blogPosts: [{
        type: Schema.Types.ObjectId, 
        ref: 'blogPost'}]
});

UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});

UserSchema.pre('remove', function(next) {
    /// this === joe , if function() is used vs () => word 'this' represend user instance
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({_id: { $in: this.blogPosts}})
        .then(() => next());

});
const User = mongoose.model('user', UserSchema);
module.exports = User;
