const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be at least two characters'],

    },
    years: {
        type: Number,
        required: [true, 'Age is required'],
        min: 1,
        max: 100,
        
    },
    kind: {
        type: String,
        required: true,
        minLength: [3, 'Kind should be at least three characters'],
    },
    image: {
        type: String,
        required: [true, 'ImageUrl is required'],
        match: [/^https?:\/\//, 'Invalid url'],
        
    },
    need: {
        type: String,
        required: true,
        minLength: [3, 'Need should be at least three characters'],
        maxLength: [20, 'Kind should be no longer than 20 characters'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: 5,
        maxLength: 15,
        
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: 5,
        maxLength: 50,
        
    },
    donation: [
        {
            user: {
                type:mongoose.Types.ObjectId,
                required: true,
                ref: 'User',
            },
           
        }
    ],
    owner: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
    },
    
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;