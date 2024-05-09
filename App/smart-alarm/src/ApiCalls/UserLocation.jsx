// const findMyState =async () =>{
//     let latitude;
//     let longitude;
//     const success = (position) =>{
//         console.log(position)
//          latitude = position.latitude
//          longitude= position.longitude
//     }

//     const error = () => {
//         console.log("error")
//     }

//     navigator.geolocation.getCurrentPosition(success,error);

//     const response = await fetch('https://api.openweathermap.org/geo/1.0/reverse?lat=13.054049&lon=80.072999&appid=1729e8ed8651f3e176e80b4e8b77cc7f');
//     const data = await response.json();
//     console.log(data);
//     console.log(data[0].name)
//     console.log(data[0].state)
//     console.log(data[0].local_names.ta)
// }

// findMyState()
// //ec426f0dbb847acef7b4ceb5b9a479c1

import React, { createContext, useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { StateContext } from '../Component/Context/AppContextAPI/StateProvider';
import axios from 'axios';

const UserLocation = ({mobile,setMobile,setRadiDist,latitude,longitude,distTbetweenTwoPoints}) => {
  
  const {search,destination,distance,estTime,setSearch,setDestination,setDistance,setEstTime,destLati,destLongi,setDestLati,setDestLongi,distanceBetweeen,setDistanceBetween} = useContext(StateContext)
  const [mobileToCall,setMobileToCall] = useState('+916369417210')

  const handleChangeMobile = async()=>{
    const { value: Number } = await Swal.fire({
      title: "Mobile number",
      input: "number",
      inputLabel: "Your Mobile Number",
      inputPlaceholder: "Enter Mobile number"
    });
    if (Number) {
      setMobile(Number)      
      Swal.fire(`Entered Number: ${Number}`);
    }
  }
  const handleRadiusChange = async()=>{
    const { value: Number } = await Swal.fire({
      title: "Radius",
      input: "number",
      inputLabel: "Distance to ring alarm",
      inputPlaceholder: "Enter Distance"
    });
    if (Number) {
      setRadiDist(Number)      
      Swal.fire(`Distance changed to : ${Number}`);
    }
  }
  
  // function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2-lat1);  // deg2rad below
  //   var dLon = deg2rad(lon2-lon1); 
  //   var a = 
  //     Math.sin(dLat/2) * Math.sin(dLat/2) +
  //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
  //     Math.sin(dLon/2) * Math.sin(dLon/2)
  //     ; 
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  //   var d = R * c; // Distance in km
  //   return d;
  // }
  // function deg2rad(deg) {
  //   return deg * (Math.PI/180)
  // }


  const makeCalls = async()=>{
       axios.post('http://localhost:6369/makecalls',{
        mobile:mobileToCall
       })
      .then((res)=>res.json())
      .then((res)=>console.log(res))
  }


  const getMobileNo = async()=>{
    const { value: Number } = await Swal.fire({
      title: "Mobile number",
      input: "number",
      inputLabel: "Your Mobile Number",
      inputPlaceholder: "Enter Mobile number"
    });
    if (Number) {
      setMobileToCall(Number)      
      Swal.fire(`Entered Number: ${Number}`);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("distance ",distTbetweenTwoPoints)
      if(distTbetweenTwoPoints > 5 && distTbetweenTwoPoints < 50){
        console.log("calling mobile")
        makeCalls()
      }
    }, 1000*60);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    if(distTbetweenTwoPoints > 5 && distTbetweenTwoPoints < 50){
      console.log("calling mobile")
      makeCalls()
    }
  },[distTbetweenTwoPoints])

  return (
    <div className='container '>
      <button className='btn btn-primary  my-4 btn-sm  mx-1'  onClick={handleChangeMobile}>Change Mobile Number</button>
      <button className='btn btn-primary  my-4 btn-sm  mx-1'  onClick={handleRadiusChange}>Change Distance</button>
      <button className='btn btn-primary my-3 btn-sm mx-1' onClick={getMobileNo} > Add a Number to Call</button>
      <button className='btn btn-primary my-3 btn-sm mx-1' onClick={makeCalls} > Test</button>
    </div>
  )
}

export default UserLocation
