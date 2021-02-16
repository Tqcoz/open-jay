import { Schema, Model, model as mModel, Mongoose } from "mongoose"
import { User } from '../../interfaces/User';
const mongoose:Mongoose = require('mongoose')
const model:Model<User> = mModel('User', new Schema({
    id: String,
    username: String,
    discriminator: Number,
    avatar: String,
    friends: Array,
    email: String,
    guilds: [{
        type: mongoose.Types.ObjectId,
        ref: 'Guilds'
    }],
    password: String,
    token: String
}))
export = {
    Class: class UserClass{
        // Will be useful later on
        user: User
        constructor(u: User) {
            this.user = u;
        }
    },
    getUserByToken: async function (token: string) {
        return await model.findOne({token}).catch(() => {})
    },
    model

}