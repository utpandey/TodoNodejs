const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoTitle: {
        type: String,
        required: true
    },
    todoDate: {
        type: String,
        required: true
    },
    todoPriority: {
        type: Number,
        required: true
    },
    todoCompleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: {} });

mongoose.model('TODO', todoSchema);

module.exports = todoSchema