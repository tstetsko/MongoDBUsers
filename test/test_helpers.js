
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //use ES6 Promisess

before((done) =>{
    mongoose.connect('mongodb://localhost/user_test', 
        { useUnifiedTopology: true, 
            useFindAndModify: false,
            useNewUrlParser: true });
    mongoose.connection.once('open', () => {
        done();
    })
    .on('error', (error) => {
        console.log('Warning', error);
    });
});


beforeEach((done) => {
    mongoose.connection.dropCollection("users",(() => {
        //redy to run the next test
        done();
 }));
})
