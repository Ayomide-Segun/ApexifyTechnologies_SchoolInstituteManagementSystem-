const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: String,
        user_id: String,
        role: {
            type: String,
            enum: [
                'Admin',
                'Lecturer',
                'Student'
            ],
            required: true
        },
        level: Number,
        program: String,
        department: String,
        faculty: String,
        password: String,
        dob: String
    },
    {
        timestamp: true
    }
);


module.exports = mongoose.model('User', userSchema);