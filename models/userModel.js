// import mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next){
    try{
        const user = this

        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        next()
    

    }catch(error){
        console.log(error)
    }
})

const userModel = mongoose.model('userModel', userSchema)


// Export so as to user else where
module.exports = userModel