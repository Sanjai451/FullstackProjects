const test =()=>{
    const data = fetch('http://localhost:5001/datas')
    .then((res)=>res.json())
    .then((res)=>console.log(res[0].latitude,"==",res[0].longitude))
}
test()