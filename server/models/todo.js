const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String
    }
});

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;