const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    name: {
        type: String,
        minlength: 50
    },
    role: {
        type: Number,
        default: 0
    }
})