const mongoose =require('mongoose')
const {ObjectId} =mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/webarts/image/upload/v1598703774/default_jya5m4.jpg"
    },
    resetToken:String,
    expireToken:Date,
    followers:[
        {
            type:ObjectId,
            ref:'Users'
        }],
       following:[
        {
            type:ObjectId,
            ref:'Users'
        }],
})

mongoose.model("Users",userSchema);