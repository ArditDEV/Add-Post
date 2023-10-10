const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
    input:String
});

module.exports = mongoose.model('posts',inputSchema)