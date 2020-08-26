const express =require('express');
const mongoose=require('mongoose');
const PORT=3000;
require('./models/user')

const app=express();
app.use(express.json())

//Routes
app.use(require('./routes/auth'));

//Database Connection
const {MONGOURI} =require('./keys')
mongoose.connect(MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo !!')
})

mongoose.connection.on('error',(err)=>{
    console.log('error connecting to mongo ???',err);
})





app.listen(PORT,()=>{
    console.log('server running...........')
})