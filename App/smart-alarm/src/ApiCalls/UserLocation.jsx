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

const UserLocation = ({mobile,setMobile,setRadiDist}) => {

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
  return (
    <div className='container '>
      <button className='btn btn-primary col-4 my-4 btn-sm rounded-3 mx-1'  onClick={handleChangeMobile}>Change Mobile Number</button>
      <button className='btn btn-primary col-4 my-4 btn-sm rounded-3 mx-1'  onClick={handleRadiusChange}>Change Distance</button>
    </div>
  )
}

export default UserLocation
