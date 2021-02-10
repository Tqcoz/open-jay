const mongoose = require('mongoose')
const model = mongoose.model('User', new mongoose.Schema({
    id: Number,
    username: String,
    discriminator: Number,
    avatar: String,
    friends: Array,
    guilds: Array
}))
export = {
    getUser: async function (id: Number) {
        let User = await model.findOne({id}).catch(()=>{
            return;
        });
        User.friends = []
        User.friends.forEach(async (friendId: { "": Number; }) => {
            User.friends.push(await model.findOne({id: friendId}))
        });
        return User;
    
    },
    model

}