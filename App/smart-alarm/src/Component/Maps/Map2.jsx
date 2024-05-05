import React, { useContext, useEffect } from 'react'
import { StateContext } from '../Context/AppContextAPI/StateProvider'

const Map2 = () => {
  const {search,destination,distance,estTime,setSearch,setDestination,setDistance,setEstTime,destLati,destLongi,setDestLati,setDestLongi,distanceBetweeen,setDistanceBetween} = useContext(StateContext)
    // useEffect(()=>{
    //     console.log(destLati,"--",destLongi)
    // },[destLati,destLongi])
  return (
    <div className="row mx-5 my-5 center-block">
        <iframe src={`http://www.google.com/maps?q=${destLati},${destLongi}&hl=es;&output=embed`} frameborder="0" width="500" height="500" ></iframe>
  </div>
  )
}

export default Map2
