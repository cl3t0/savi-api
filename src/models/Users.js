// Importing mongoose to create the table
const mongoose = require('mongoose');
// Creating table schema
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birth: {
        type: Date,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email_confirmation: {
        type: Number,
        default: 0,
    },
    logged: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
// Adding the new table if it doesn't exist
mongoose.model('Users', UsersSchema);