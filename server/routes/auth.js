const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const crypto=require('crypto')
const jwt =require('jsonwebtoken');
const nodemailer=require('nodemailer');
const {JWT_SECRET,PASSWORD}=require('../config/keys')
const User=mongoose.model("Users");

const requiredLogin=require('../middleware/requireLogin')

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: 'cseamit084@gmail.com', // generated ethereal user
      pass: PASSWORD // generated ethereal password
    }
  });


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
                transporter.sendMail({
                    to:user.email,
                    from:"no-reply@insta.com",
                    subject:"SignUp Success",
                    html:`<h1>Welcome ${user.name}, to my instagram</h1>`
                })
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
        return res.status(422).json({error:"Please fill all the  fields are required"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Invalid email or password"})
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
                return res.status(422).json({error:"Invalid password"})
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

router.post("/reset_password",(req,res)=>{

    crypto.randomBytes(32,(err,buffer)=>{

        if(err)
        {
            console.log(err)
        }
        else{
            const token=buffer.toString("hex")
            User.findOne({email:req.body.email})
            .then(user=>{
                if(!user)
                {
                    return res.status(422).json({error:"User don't exist with this email"})
                }
                user.resetToken=token
                user.expireToken=Date.now()+3600000

                user.save()
                .then((result)=>{
                    transporter.sendMail({
                        to:user.email,
                        from:"no-reply@myinsta.com",
                        subject:"Request to change password",
                        html:`
                            <p>To reset paaword ,<a href ="http://localhost:3000/reset/${token}">Click Here</a></p>
                            <p>You will be redirected to reset password page.</p>
                             `
                    })
                    res.json({message:"Check your email"})
                })
            })
        }
    })
})

router.post("/newpassword",(req,res)=>{
    const newpassword=req.body.password;
    const sentToken=req.body.token;
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user)
        {
            return res.json(422).json({error:"Session expired.Try again"})
        }
        bcrypt.hash(newpassword,12)
        .then(hashedpassword=>{
            user.password=hashedpassword
            user.resetToken=undefined
            user.expireToken=undefined
            user.save()
            .then(savedUser=>{
                res.json({message:"password updated successfully"})
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })

})

module.exports=router;