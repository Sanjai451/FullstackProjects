const findMyState =async () =>{
    let latitude;
    let longitude;
    const success = (position) =>{
        console.log(position)
         latitude = position.latitude
         longitude= position.longitude
    }

    const error = () => {
        console.log("error")
    }

    navigator.geolocation.getCurrentPosition(success,error);

    const response = await fetch('https://api.openweathermap.org/geo/1.0/reverse?lat=13.054049&lon=80.072999&appid=1729e8ed8651f3e176e80b4e8b77cc7f');
    const data = await response.json();
    console.log(data);
    console.log(data[0].name)
    console.log(data[0].state)
    console.log(data[0].local_names.ta)
}

//findMyState()
//ec426f0dbb847acef7b4ceb5b9a479c1

const findMyCoords = async()=>{
    let city="madurai"
    let appid='ec426f0dbb847acef7b4ceb5b9a479c1'
    const response =await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=1729e8ed8651f3e176e80b4e8b77cc7f`)
    const data = await response.json();
    console.log(data)
    console.log(data[0].lat)
    console.log(data[0].lon)
    console.log(data[0].name)
}
//findMyCoords()

const findDetails = async()=>{
    const success = (position) =>{
                console.log(position)
                 const lati = position.coords.latitude
                 const longi= position.coords.longitude
                //  setLatitude(lati)
                //  setLongitude(longi)
                //  setPosition(position)
                console.log(lati)
                console.log(longi)
                // console.log(lati, ' ' ,latitude)
                // console.log(longi," ",longitude)
    }   
    const error = () => {
        console.log("error")
    }

    navigator.geolocation.getCurrentPosition(success,error);
}

// findDetails()
// const btn = document.getElementById('sample')

// btn.addEventListener("click",()=>{
//     Notification.requestPermission().then(per=>{
//         if(per === "granted"){
//             new Notification("example notificaton",{
//                 body:"my first notificaton",
//             })
//             alert("hello")
//         }
//     })}

// )

const TWILIO_ACCOUNT_SID = 'ACd579e358717ab8df2d520bd7c3287732'
const TWILIO_AUTH_TOKEN = 'd8ee1b24108285ec60e6709059b9cb84'

const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    from: '+12569738178',
    to: '+916369417210',
    body: 'Hello',
    // messagingServiceSid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    
  })
  .then(message => console.log(message.sid));