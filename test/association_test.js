const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comments;
    beforeEach((done) =>{
          joe = new User({name: 'Joe'});  
          blogPost = new BlogPost ({title: 'JS is Greate', content: 'Yep it really is'});
          comment = new Comment({ content: 'Congrats on great post' });
          
          joe.blogPosts.push(blogPost);
          blogPost.comments.push(comments);
          comment.user = joe;
         
          Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
    });

    it.only('save a relation berween a user and a blogpost', (done) => {
       User.findOne({name: 'Joe'})
       .then((user) => {
           console.log(user);
           done();
       })
    })
});
