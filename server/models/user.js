const mongoose = require('mongoose');
//const todo = mongoose.model('todo');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    todo: [{
        //todo: todo.schema
        title: String
    }]
});

const user = mongoose.model('user', userSchema);

module.exports = user;