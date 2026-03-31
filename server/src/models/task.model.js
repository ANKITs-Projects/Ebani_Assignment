const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EbaniUsers',
        require: true
    },
    task: {
        type: String,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model("EbaniTask", taskSchema);