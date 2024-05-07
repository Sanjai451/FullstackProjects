import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../Context/AppContextAPI/StateProvider'

const Recents = ({setLatitude,setLongitude}) => {
    const {search,destination,distance,estTime,setSearch,setDestination,setDistance,setEstTime,destLati,destLongi,setDestLati,setDestLongi,distanceBetweeen,setDistanceBetween} = useContext(StateContext)

    // let lat;
    // let long;
    // let city;
    const[lat,setlat] = useState(0)
    const[long,setlong] = useState(0)
    const[city,setcity] = useState(0)

    const handleDataFromBackend = async()=>{
        const data = fetch('http://localhost:5001/datas')
        .then((res)=>res.json())
        .then((res)=>{
            const lati=res[0].destination_latitude
            const longi= res[0].destination_longitude
            const cityi=res[0].destination_city
            console.log(lati,'===',longi,'----',cityi)
            setlat(res[0].destination_latitude)
            setlong(res[0].destination_longitude)
            setcity(res[0].destination_city)

        })
        
    }
    const replace = ()=>{
        console.log(lat,'==0=',long,'----',city)
        // setLatitude(lat)
        // setLongitude(long)
        setDestLati(lat)
        setDestLongi(long)
    }
    useEffect(()=>{
        handleDataFromBackend()
    },[])
  return (
    <div className='container bg-dark text-white rounded-4 p-2'>
        <h3 className='px-2'>Recent Search</h3>
        <p className='px-1'>To: {city}</p>
        <button className='btn btn-primary mx-2' onClick={replace} >Make this as location</button>
    </div>
  )
}

export default Recents
