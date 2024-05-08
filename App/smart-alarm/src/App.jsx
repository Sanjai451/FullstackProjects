import { createContext, useContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './Component/Header/Navbar'
import Maps from './Component/Maps/Maps'
import Input from './Component/Input/Input'
import Details from './Component/Details/Details'
import { StateContext, StateProvider } from './Component/Context/AppContextAPI/StateProvider'
import UserLocation from './ApiCalls/UserLocation'
import Map2 from './Component/Maps/Map2'
import Recents from './Component/Recents/Recents'

function App() {
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0)
  const [position,setPosition] = useState('')
  const [mobile,setMobile] = useState(+916369417210)
  const [displayMap,setDisplayMap] = useState(false)
  const [displayDetail,setDisplayDetail] = useState(false)
  const [radiDist,setRadiDist] = useState(100)

    const findDetails = async()=>{
        const success = (position) =>{
                    console.log(position)
                     const lati = position.coords.latitude
                     const longi= position.coords.longitude
                     setLatitude(position.coords.latitude)
                     setLongitude(position.coords.longitude)
                     setPosition(position)
                     console.log(lati, '-' ,latitude)
                     console.log(longi,"-",longitude)
        }   
        const error = () => {
            console.log("error")
        }
        navigator.geolocation.getCurrentPosition(success,error);
    }

    //on first render
    useEffect(()=>{
        findDetails()
    },[])

    //for each 60 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        findDetails()
      }, 1000*60);
      return () => clearInterval(interval);
    }, []);
    
  const handleTest = ()=>{
    fetch('http://localhost:5001/data1').then((res)=>res.json()).then((data)=>console.log(data[4].name))
  }
  console.log(latitude,'=+=+',longitude)
  return (
    <>
    <StateProvider>
        <Navbar/>
        <Maps latitude={latitude} longitude={longitude}/>
        <Input setDisplayDetail={setDisplayDetail} setDisplayMap={setDisplayMap}/>
        {displayMap ? <Map2 />:null}
        {displayDetail ? <Details latitude={latitude} longitude={longitude} mobile={mobile} radiDist={radiDist}/> : null}
        <UserLocation mobile={mobile} setRadiDist={setRadiDist}   setMobile={setMobile} latitude={latitude} longitude={longitude} />
        <Recents setLatitude={setLatitude} setLongitude={setLongitude}/>
    </StateProvider>
    </>
  )
}

export default App
