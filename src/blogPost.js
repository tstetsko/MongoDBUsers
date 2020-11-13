const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostShema = new Schema({
    title: String,
    content: String

});