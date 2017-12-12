const mongoose = require('mongoose'),
Schema = mongoose.Schema

var User = new Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true,
    trim: true
},
phone: {
    type: String,
    required: true,
    trim: true
},
company: {
    type: String,
},
officialVisit: {
    type: String,
},
escortNeeded: {
    type: String,
},
escortName: {
    type: String,
}
})

module.exports = mongoose.model('User', User)
