const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    uid: {
        type: Number,
        required: true 
    },
    uname: {
        type: String,
        required: true 
    },
    did: {
        type: Number,
        required: true 
    }
}, {
    timestamps: true,
    collection: 'User' 
});

module.exports = mongoose.model('User', UserSchema);

