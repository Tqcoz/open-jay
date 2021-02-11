const mongoose = require('mongoose')
const model = mongoose.model('User', new mongoose.Schema({
    id: String,
    username: String,
    discriminator: Number,
    avatar: String,
    friends: Array,
    email: String,
    guilds: Array,
    password: String
}))
export = {
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