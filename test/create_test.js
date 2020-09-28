const assert = require('assert');
const User = require('../src/user');
describe('creting records', () => {
    it('saves a user', (done) => {
        const joe = new User({
            name: 'Joe'
        })
        joe.save().
        then(() => {
            //has joe saved
            assert(!joe.isNew);
            done();
        });
    });

});