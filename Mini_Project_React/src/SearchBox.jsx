import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function SearchBox({updateInfo}){
    let [city,setCity]=useState("");

    const API_URL="http://api.openweathermap.org/data/2.5/weather";
    const API_KEY="e7e7c1e580ab55c52287f9e1a5b0b44c";

    let getWeatherInfo=async ()=>{
        let response=await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );
        let jsonResponse=await response.json();
        let result={
            city:city,
            temp:jsonResponse.main.temp,
            tempMin:jsonResponse.main.temp_min,
            tempMax:jsonResponse.main.temp_max,
            humidity:jsonResponse.main.humidity,
            feelsLike:jsonResponse.main.feels_like,
            weather :jsonResponse.weather[0].description,
        };
        console.log(result);
        return result;
    }

    let handleChange=(event)=>{
        setCity(event.target.value);
    };
    let handleSubmit=async (event)=>{
        event.preventDefault();
        console.log(city);
        setCity("");
        let newInfo= await getWeatherInfo();
        updateInfo(newInfo);
    }
    return(
        <div className="SearchBox">
            <h2>Search City for the Weather Updates</h2>
            <form>
                <TextField 
                id="outlined-basic" 
                label="City Name" 
                variant="outlined" 
                value={city} 
                onChange={handleChange}/>
                <br>
                </br>
                <br></br>
                <Button variant="contained" type='submit' onClick={handleSubmit}>
                    Search
                </Button>
            </form>
        </div>
    );
}