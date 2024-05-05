import React, { useContext } from 'react'
import { StateContext } from '../Context/AppContextAPI/StateProvider'

const HandleBackend = () => {
    const {search,destination,distance,estTime,setSearch,setDestination,setDistance,setEstTime,destLati,destLongi,setDestLati,setDestLongi,distanceBetweeen,setDistanceBetween} = useContext(StateContext)
  return (
    <div>
      
    </div>
  )
}

export default HandleBackend
