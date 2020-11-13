const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('PostCount returns number of posts', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            posts: [{title: 'PostTitle'}]
        });

        joe.save()
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
            assert(user.postCount === 1);
            done();
        }) 
        .catch((error) => {
            console.log('****error****:', error);
          });;
    });

    
});