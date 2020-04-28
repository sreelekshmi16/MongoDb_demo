const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3

    },
    age: {
        type: Number,
        required: true
    }
})
const User = mongoose.model('user', userSchema);

async function createUser(){
    const user = new User({
        name:'Yedhu',
        age:28
    });
    
const result = await user.save()
    console.log(result);
}
// createUser();

module.exports = { User };