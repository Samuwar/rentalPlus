const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User_id is required' ],
        index: { unique: [true, 'Email already taken'] },
        trim: true
    },
    name:{
        type: String,
        required: [true, 'Firstname is required' ],
        trim: true
    },
    gender:{
        type:String,
        required: [true, 'Gender is required'],
        trim: true
        
    },
    email:{
        type:String,
        required: [true, 'Email is required'],
        index: { unique: [true, 'Email already taken'] },
        trim: true
    },
    password: {
        type:String,
        required: [true, 'Password is required']
    }
})

const UserModel = mongoose.model("user", UserSchema)


module.exports = UserModel;
