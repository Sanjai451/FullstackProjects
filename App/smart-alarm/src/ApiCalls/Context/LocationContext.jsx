import React, { createContext, useContext } from 'react'
export const  LocationContextProvider = createContext()
const LocationContext = () => {
    const [latitude,setLatitude] = useState(0);
    const [longitude,setLongitude] = useState(0)
    const [position,setPosition] = useState('')

    const findDetails = async()=>{
        const success = (position) =>{
                    console.log(position)
                     const lati = position.coords.latitude
                     const longi= position.coords.longitude
                     setLatitude(lati)
                     setLongitude(longi)
                     setPosition(position)
                    //  console.log(lati, ' ' ,latitude)
                    //  console.log(longi," ",longitude)
        }   
        const error = () => {
            console.log("error")
        }

        navigator.geolocation.getCurrentPosition(success,error);
    }

    useEffect(()=>{
        findDetails()
    },[])

  return (
    <LocationContextProvider.Provider values={{latitude,longitude,position}}>
         {children}
    </LocationContextProvider.Provider>
  )
}

export default LocationContext
