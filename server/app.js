const express =require('express');
const mongoose=require('mongoose');
// const cors=require('cors')
const PORT=5000;


//Database Connection
const {MONGOURI} =require('./keys')
mongoose.connect(MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo !!')
})

mongoose.connection.on('error',(err)=>{
    console.log('error connecting to mongo ???',err);
})

const app=express();

// app.use(cors())
//models
require('./models/user')
require('./models/post')

//Routes
app.use(express.json())
app.use(require('./routes/auth'));
app.use(require('./routes/post'));




app.listen(PORT,()=>{
    console.log('server running...........')
})