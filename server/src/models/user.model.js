const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'Admin', 'User'],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EbaniUsers'
    }
}, {timestamps: true})

module.exports = mongoose.model("EbaniUsers", userSchema);