import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'

const Weather = () => {
    const [city,setCity]=useState({})
    const [weatherData,setWeatherData]=useState({})
    const [foreCast,setForeCast]=useState([])
    const [error,setError]=useState(false)
    const [gotData,setGotData]=useState(false)
    console.log(foreCast);
    const handleChange=(e)=>{
        setCity({
            cityname:e.target.value
        })
    }
    const handleClick=()=>{
        getWeatherData()
    }
    const handleForecast=()=>{
        ForeCastData()
    }
    const getWeatherData=()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.cityname}&appid=070263d29127d18e1b69c774a996ef65&units=metric`)
        .then((res)=>{
            setWeatherData(res.data)
            setGotData(true)
            setError(false)
        }).catch((err)=>{
            console.log("err",err.message)
            setError(true)
        })
    }
    const ForeCastData=()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord?.lat}&lon=${weatherData.coord?.lon}&exclude=current,hourly,minutely&appid=e4b61541705c6cb668a4b697b84d3660&units=metric`)
        .then((res)=>{
            setForeCast(res.data.daily)
        }).catch((err)=>{
            console.log("err",err.message)
        })
    }


  return (
    <div>
        <div>
             <h1>Daily Weather Report</h1>
             <div>
                 <input type="text" placeholder='City' onChange={handleChange} style={{width:250, textAlign:"center"}}/>
                 <br />
                 <br />
                 <button onClick={handleClick} style={{width:150, borderRadius:5, fontWeight:"bold"}}>Submit</button>
             </div>
        </div>
        {
            gotData?(
                <div>
                    <div>
                        <h1><span style={{color:"blue"}} onClick={handleForecast}>Click Here </span>See the Next 7 Days ForeCast</h1>
                    </div>
                    <div style={{display:"flex", "gap":"50px",width:"55%", margin:"auto"}}>
                        <div style={{border:"1px solid red", backgroundColor:"#ff0ed7", fontWeight:"bold", width:"33%",textAlign:"left", paddingLeft:50 , marginTop:30, borderRadius:10}}>
                            <p>City : {weatherData.name}</p>
                            <p>Sunrise : {weatherData.sys?.sunrise}</p>
                            <p>Sunset : {weatherData.sys?.sunset}</p>
                            <p>Wind Pressure : {weatherData.main?.pressure} pa</p>
                            <p>Humidity : {weatherData.main?.humidity}</p>
                            <p>Temperature  : {weatherData.main?.temp} C</p>
                            <p>Minimum Temperature : {weatherData.main?.temp_min} C</p>
                            <p>Maximum Temperature : {weatherData.main?.temp_max} C</p>
                            <p>Wind Speed : {weatherData.wind?.speed}</p>
                            <p>Clouds  : {weatherData.clouds?.all}</p>
                        </div>
                        <div>
                            <iframe style={{border:"solid #ff0ed7", color:"#ff0ed7", fontWeight:"bold", textAlign:"left",paddingTop:5, marginTop:30, height:400,width:"150%", borderRadius:10}} src={`https://www.google.com/maps/embed/v1/place?q=${weatherData.name}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`} title="Map"></iframe>
                        </div>   
                    </div> 
                </div>
            ):("")
        }
        
        <div style={{"display":"flex", width:"80%",gap:10,margin:"auto", marginTop:50}}>
            {
                foreCast.map((el)=>(
                    <div style={{border:"1px solid red", borderRadius:10,backgroundColor:"#10a310", fontWeight:"bold"}}>
                        <p>{Date(el.dt*1000)}</p>
                        <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="" />
                        <p>Day Temp : {el.temp.day.toFixed(0)}C</p>
                        <p>Night Temp : {el.temp.night.toFixed(0)}C</p>
                    </div>
                ))
            }
        </div>                 
         {
            error?<div>
                <h1>Cant Find The details of the city/ Enter The Proper City Name</h1>
            </div>
            :("")
         }
    </div>
  )
}

export default Weather