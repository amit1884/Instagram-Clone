const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const requireLogin=require('../middleware/requireLogin')
const Post=mongoose.model("Post")
router.post('/createpost',requireLogin,(req,res)=>{

    const {title,body}=req.body;
    if(!title||!body){
        return res.status(422).json({message:"Please fill all the fields"})
    }
    console.log(req.user)
    res.send("Ok")
    // const post=new Post({
    //     title,
    //     body,
    //     psotedBy
    // })
})


module.exports=router;