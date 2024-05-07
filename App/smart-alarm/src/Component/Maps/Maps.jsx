import React, { useContext } from 'react'
import { StateContext } from '../Context/AppContextAPI/StateProvider'

const Maps = ({latitude,longitude}) => {
  const {search,destination,distance,estTime,setSearch,setDestination,setDistance,setEstTime,destLati,destLongi,setDestLati,setDestLongi,distanceBetweeen,setDistanceBetween} = useContext(StateContext)
 
  const handleRefreshMaps = ()=>{
    const map = document.getElementById('maps')
    map.src=`http://www.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`
  }
  console.log(latitude,'-lat and long on loading map-',longitude)

  return (
    <div className="row mx-5 my-5 center-block">

          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497512.57746524335!2d79.87933633312294!3d13.047316854122823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714406655695!5m2!1sen!2sin" 
                  className="embed-responsive-item" 
                    width="500" height="500" 
          ></iframe> */}
    <iframe
     src={`http://www.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`}  
     width="500" 
     height="500"
     id='maps'
      >
     </iframe> 
     <button type="button"  className="btn btn-dark py-2 my-2 " onClick={handleRefreshMaps}>Refresh</button>
  </div>
  )
}

export default Maps
