// Importing mongoose to create the table
const mongoose = require('mongoose');
// Creating table schema
const ResourcesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    type: { // This needs to be something like "water, medicine, food..."
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
// Adding the new table if it doesn't exist
mongoose.model('Resources', ResourcesSchema);