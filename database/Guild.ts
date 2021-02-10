const mongoose = require('mongoose')
const model = mongoose.model('User', new mongoose.Schema({
    id: Number,
    name: String,
    channels: Array,
    members: Array
}))
export = {
    model

}