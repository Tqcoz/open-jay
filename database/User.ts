const mongoose = require('mongoose')
const model = mongoose.model('User', new mongoose.Schema({
    id: String,
    username: String,
    discriminator: Number,
    avatar: String,
    friends: Array,
    email: String,
    guilds: Array,
    password: String,
    token: String
}))
interface User{
    id?: string,
    username?: string,
    discriminator?: string,
    avatar?: string,
    email?: string,
    password?: string,
    token?: string,
    friends?: Array<this>,
    guilds?: Array<string>
}
export = {
    Class: class UserClass{
        user: User
        constructor(u: User) {
            this.user = u;
        }
    },
    getUser: async function (id: String) {
        let User = await model.findOne({id}).catch(()=>{
            return;
        });
        User.friends = []
        User.friends.forEach(async (friendId: { "": String; }) => {
            User.friends.push(await model.findOne({id: friendId}))
        });
        return User;
    
    },
    model

}