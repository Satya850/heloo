const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
    did: {
        type: Number,
        required: true 
    },
    dname: {
        type: String,
        required: true 
    }
}, {
    timestamps: true,
    collection: 'Department' 
});

module.exports = mongoose.model('Department', DepartmentSchema);