const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () =>{

    it('require user name', () => {
        const user = new User({name: undefined});
        const validationResult =  user.validateSync();
        //console.log(validationResult);
        const message = validationResult.errors.name.message;
        //console.log('message:', message);
        assert(message === 'Name is required.');
    });

    
    it('require users name longer then 2 characters', () => {
        const user =  new User({name: 'Al'});
        const validationResult =  user.validateSync();
        //console.log(validationResult);
        const message = validationResult.errors.name.message;
        assert(message === 'Name must be longer then 2 charecters.');
    });

    it('dissallows invalid records from being saved', (done) => {
        const user =  new User({name: 'Al'});
        user.save()
        .catch((validationResult)=> {
            const message = validationResult.errors.name.message;
            assert(message === 'Name must be longer then 2 charecters.');
            done();
        });
    });

})