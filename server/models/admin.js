const mongoose = require('mongoose'),
Schema = mongoose.Schema

var Admin = new Schema({
username: {
    type: String,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true,
    trim: true
}
})

module.exports = mongoose.model('Admin', Admin)
