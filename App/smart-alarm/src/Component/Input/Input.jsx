import React, { useContext } from 'react'
import { StateContext } from '../Context/AppContextAPI/StateProvider'

const Input = ({setDisplayDetail,setDisplayMap}) => {

  const {search,destination,distance,estTime,setSearch,setDestination,setDistance,setEstTime,destLati,destLongi,setDestLati,setDestLongi,distanceBetweeen,setDistanceBetween} = useContext(StateContext)

  const printSearch =(e)=>{
    //console.log(e.target.value)
    setSearch(e.target.value)
    findMyCoords()
    setDisplayDetail(true)
    setDisplayMap(true)
  }

  const handlekeydown =(e)=>{
    if(e.key === "Enter"){
      printSearch()
    }
  }
  const printOnClick=()=>{
    handleBtnClick()
    printSearch()
  }
  const handleBtnClick=()=>{
    setDisplayDetail(true)
    setDisplayMap(true)
  }
  const findMyCoords = async()=>{
    let appid='ec426f0dbb847acef7b4ceb5b9a479c1'
    const response =await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=1729e8ed8651f3e176e80b4e8b77cc7f`)
    const data = await response.json();
    // console.log(data)
    setDestLati(data[0].lat)
    //console.log(data[0].lat)
    setDestLongi(data[0].lon)
    // console.log(data[0].lon)
    // console.log(data[0].name)
}
  return (
  <div className="input-group my-4 container ">
    <input type="text" className="form-control border border-black" placeholder="Search..."  value={search} onChange={printSearch} onKeyDown={handlekeydown}/>
    <button className="btn btn-outline-secondary" type="button" onClick={printOnClick}>Search</button>
  </div>
   
  )
}

export default Input
