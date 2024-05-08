const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 6369;

app.use(cors())
app.use(express.json())
app.get('/',(req,res,next)=>{
    res.send("hello world From testing")
})

function makingcalls(x){
    const accountSid  = 'ACd579e358717ab8df2d520bd7c3287732'
    const authToken = 'd8ee1b24108285ec60e6709059b9cb84'
    const client = require('twilio')(accountSid, authToken);
    client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: `${x}`,
         from: '+12569738178'
       })
      .then(call => console.log(call.sid));
    console.log("function called successsfullly")
}

app.get('/makecalls',(req,res)=>{
    makingcalls()
    res.send(`called function to make call `)
})

app.post('/makecalls',(req,res)=>{
    const {mobile} = req.body
    makingcalls(mobile)
    res.send(mobile)
})
 
app.listen(port,()=>console.log("running on port " + port))