const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const {JWT_SECRET }=require('../keys')
const User=mongoose.model("Users");

const requiredLogin=require('../middleware/requireLogin')


router.post('/signup',(req,res)=>{

    const{name,email,password,pic}=req.body;

    if(!email||!password||!name)
    {
       return res.status(422).json({
            error:"Please fill al the fields"
        })
    }

    User.findOne({email:email})
    .then(savedUser=>{
        
        if(savedUser){
            return res.json({message:"Already Exist"});
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{

            const user=new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save()
            .then(user=>{
                res.json({message:"Successfully saved"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post("/signin",(req,res)=>{

    const{email,password}=req.body;

    if(!email||!password){
        return res.status(422).json({message:"Please fill all the  fields are required"})
    }

    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({message:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){

                // res.json({message:"Successfull Logged In !!!!!!!"});
                const token =jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic}=savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})

            }
            else{
                return res.status(422).json({message:"Invalid password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=router;