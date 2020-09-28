const assert = require('assert');
const { join } = require('path');
const User = require('../src/user');

describe('Reading Users out of the Database', () => {
    let joe;
    
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        })
        joe.save().then(() => done());
    });

    it('finds all users with a name of joe', (done) => {
        User.find({name: 'Joe'}).then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
        });
    });

    it('find user with a id', (done) =>{
        User.findOne({_id: joe._id}).then((user) =>{
            assert(user.name === 'Joe');
            done();
        })
    })

});