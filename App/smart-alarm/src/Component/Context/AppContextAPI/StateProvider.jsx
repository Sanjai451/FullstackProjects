import React, { createContext, useEffect, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [search,setSearch] = useState("chennai")
  const [destination,setDestination] = useState('chennai')
  const [distance,setDistance] = useState(22)
  const [estTime,setEstTime] = useState(50)
  const [destLati,setDestLati] = useState(0)
  const [destLongi,setDestLongi] = useState(0)
  const [distanceBetweeen,setDistanceBetween] =useState(0)
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
    // console.log(data);
    // console.log(data[0].name)
    // console.log(data[0].state)
    // console.log(data[0].local_names.ta)
}
useEffect(()=>{
  findMyState()
},[])



  return (
    <StateContext.Provider value={{search,destination,distance,estTime,setSearch,setDestination,setDistance,setEstTime,destLati,destLongi,setDestLati,setDestLongi,distanceBetweeen,setDistanceBetween}}>
      {children}
    </StateContext.Provider>
  );
};
