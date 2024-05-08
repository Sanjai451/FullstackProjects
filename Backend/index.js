import express from 'express'
import mongoose  from 'mongoose'
import cors from 'cors'
// import router from './routes/user-routes.js'
// import blogRouter from './routes/blog-routes.js'

const port = 5001

const app = express()

app.use(express.json()) //------to use json
// app.use("/api",router)
// app.use("/api/blog",blogRouter)
app.use(cors())
mongoose.connect('mongodb://localhost:27017/smart-alarm')
    .then(()=>console.log("Connected to Database"))
    .catch((err)=>console.log(err))

const UserSchema = new  mongoose.Schema({
        latitude:Number,
        longitude:Number,
        destination_latitude:Number,
        destination_longitude:Number,
        destination_city:String,
        Time:String
})

const userModel = mongoose.model('data1',UserSchema)

//userModel.insertMany([{name:"sanjai",dob:120325,date:12},{dfdfdfd}])

//-----------------------------------------------------------------
app.get('/',(req,res,next)=>{
    res.send("hello world From testing")
})

app.get('/data1',async(req,res)=>{ //test
    const userData = await userModel.find()
    res.json(userData)
})

app.get('/datas',async(req,res)=>{
    const userData = await userModel.find()
    res.json(userData)
})

app.post('/dataput',(req,res)=>{
    const {latitude,longitude,destination_latitude,destination_longitude,city_destination} = req.body
    userModel.insertMany({
        latitude:latitude,
        longitude:longitude,
        destination_latitude:destination_latitude,
        destination_longitude:destination_longitude,
        destination_city:city_destination,
        Time: new Date()
    })
    console.log(latitude,longitude,destination_latitude,destination_longitude,city_destination)
    res.status(200).json({latitude,longitude,destination_latitude,destination_longitude,city_destination})
})

function makingcalls(){
    const accountSid  = 'ACd579e358717ab8df2d520bd7c3287732'
    const authToken = 'd8ee1b24108285ec60e6709059b9cb84'
    const client = require('twilio')(accountSid, authToken);
    client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+916369417210',
         from: '+12569738178'
       })
      .then(call => console.log(call.sid));
    console.log("function called successsfullly")
}

app.get('/makecalls',(req,res)=>{
    makingcalls()
    res.send('called function to make call')
})

app.listen(port,()=>{console.log(`Server running on ${port}`)})
//sanjaikumar451
//XpOGV9sKk3YNiJoW