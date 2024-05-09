import React, { useContext, useEffect, useMemo, useState } from 'react'
import { StateContext } from '../Context/AppContextAPI/StateProvider';
import Song from './Song.mp3'
import Swal from 'sweetalert2'
import axios from 'axios'
const Details = ({latitude,longitude,mobile,radiDist,setDistanceBetweenTwoPoints}) => {

      const [displayStopButton,setDisplayStopButton] = useState(false)

      const {search,destination,distance,estTime,setSearch,setDestination,setDistance,setEstTime,destLati,destLongi,setDestLati,setDestLongi,distanceBetweeen,setDistanceBetween} = useContext(StateContext)
        
      const audio = new Audio(Song)
      const playAudio = ()=>{
        // new Audio(Song).play()
        audio.pause()
        audio.play()
      }
      console.log(latitude ,"and",longitude)
      function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
  
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
      const distanceBetweenLocationAndDestination = getDistanceFromLatLonInKm(latitude,longitude,destLati,destLongi) 
      console.log("distance: ",getDistanceFromLatLonInKm(latitude,longitude,destLati,destLongi));
      setDistanceBetween(distanceBetweenLocationAndDestination)
      setDistanceBetweenTwoPoints(distanceBetweenLocationAndDestination)
    const notifierFunction= async()=>{
      
      console.log("distance changed to: ",getDistanceFromLatLonInKm(latitude,longitude,destLati,destLongi));
      if(distanceBetweenLocationAndDestination < radiDist){
        const distanceBetweenLocationAndDestination = getDistanceFromLatLonInKm(latitude,longitude,destLati,destLongi) 
            console.log("lowww distance")
            console.log('sending message')
            //sendTextMessage()
            console.log('message send successfully')
            Toast.fire({
                icon: "success",
                title: "Location reached"
              });
            setDisplayStopButton(true) 
            audio.pause()
            playAudio()
        }
        if(distanceBetweenLocationAndDestination < 10){
          sendTextMessage()
        }
       }
    // setInterval(()=>{
    //     console.log("calling function")
    //     notifierFunction()
    // },1000)
    // useEffect(()=>{
    //     notifierFunction()
    // },latitude,longitude,destLati,destLongi)
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

    function refreshPage() {
        window.location.reload(false);
      }  

      //console.log(radiDist)
    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            console.log("calling function")
            notifierFunction()
        }, 1000*6);
 
        //Clearing the interval
        return () => clearInterval(interval);
    }, [latitude,longitude,destLati,destLongi]);

    const passDataToBackend = async()=>{
      //fetch('http://localhost:5001/data1').then((res)=>res.json()).then((data)=>console.log(data[4].name))
      axios.post('http://localhost:5001/dataput',{
        latitude:latitude,
        longitude:longitude,
        destination_latitude:destLati,
        destination_longitude:destLongi,
        city_destination:search
      }).then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)})
    }

    const sendTextMessage = async()=>{
      const TWILIO_ACCOUNT_SID = 'ACd579e358717ab8df2d520bd7c3287732'
      const TWILIO_AUTH_TOKEN = 'd8ee1b24108285ec60e6709059b9cb84'
      const accountSid = TWILIO_ACCOUNT_SID;
      const authToken = TWILIO_AUTH_TOKEN;
      const client = require('twilio')(accountSid, authToken);
      client.messages
      .create({
      from: '+12569738178',
      to: `${mobile}`,
      body: `You are about to reach the Destinatio ${search}. The distance is ${distanceBetweeen} `,
      }).then(message => console.log(message.sid));
    }

    console.log(destLati,'=dest=',destLongi)
    console.log(latitude,'-lat and long-',longitude)

  return (
    <div className='container border  p-3 my-3 '>
    <div className="row">
        <h4 className="col" >Your destination:</h4>
        <h5 className='col'>{search}</h5>
    </div>
    {/* <div className="row">
        <h4 className="col">You will reach in</h4>
        <h5 className='col'>{estTime} minutes</h5>
    </div> */}
    <div className="row">
        <h4 className="col">Your destination is at </h4>
        <h5 className='col'>{distanceBetweeen}km</h5>
    </div>
    <div className="row">
        <h4 className="col">Your Latitude</h4>
        <h5 className='col'>{latitude}</h5>
    </div>
    <div className="row">
        <h4 className="col">Your Longitude </h4>
        <h5 className='col'>{longitude}</h5>
    </div>
    <div className="row">
        <h4 className="col">Destination Latitude</h4>
        <h5 className='col'>{destLati}</h5>
    </div>
    <div className="row">
        <h4 className="col">Destination Longitude </h4>
        <h5 className='col'>{destLongi}</h5>
    </div>
    {
      displayStopButton?
      <button className='btn btn-dark mx-5' onClick={refreshPage}>Stop Alarm</button>
      :null
    }
    <button className='btn btn-dark my-3 mx-5' onClick={passDataToBackend}>Save Record</button>
    </div>
  )
}

export default Details
