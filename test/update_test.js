const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', () =>{
    let joe;
    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0});
        joe.save().then(() => done());
    });

    function assertName(operation, done){
        operation
        .then(() => User.find({}))
        .then((users) => {
            //console.log('users:', users);
            assert(users.length === 1);
            assert(users[0].name = 'Alex');
            done();
        })
        .catch((error) => {
            console.log('****error****:', error);
          });
    }

    it('instance type using set n save update', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it ('A model instance can update', (done) => {
        assertName(joe.updateOne({name: 'Alex'}), done);
    });

    it('A model class can update',(done) => {
       assertName(
        User.updateOne({name: 'Joe'}, {name: 'Alex'}),
        done );
    });

    it('A model class can update one record',(done) => {
        assertName(
        User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
        done);
    });

    it('A model class can find by id and update one record',(done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
            done);
    });

    it('A User can have post count incremented by 1',(done) => {
        User.updateMany({name: 'Joe'}, {$inc: {likes: 10}}).then(() => 
            User.findOne({name: 'Joe'})
        )
        .then((user) => {
            assert(user.likes === 10);
            done();
        })
        .catch((error) => {
            console.log('****error****:', error);
          });
       
    });

});