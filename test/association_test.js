const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comments;
    beforeEach((done) =>{
          joe = new User({name: 'Joe'});  
          blogPost = new BlogPost ({title: 'JS is Great', content: 'Yep it really is'});
          comment = new Comment({ content: 'Congrats on great post' });
          
          joe.blogPosts.push(blogPost);
          blogPost.comments.push(comment);
          comment.user = joe;
         
          Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
    });

    it('save a relation berween a user and a blogpost', (done) => {
       User.findOne({name: 'Joe'}).populate('blogPosts')
       .then((user) => {
           console.log(user.blogPosts[0]);
           assert(user.blogPosts[0].title === 'JS is Great');
           done();
       })
    })
});
