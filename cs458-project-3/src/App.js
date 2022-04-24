import './App.css';
import React, { useState } from 'react';
import axios from "axios";

import { Paper, Grid, TextField, Button, RadioGroup, FormControlLabel, FormControl, FormLabel, Radio } from '@mui/material';
import SunCalc from "suncalc";

export function calculateDistToNP(position) {
    let current_lat = position.coords.latitude;
    let current_lng = position.coords.longitude;

    const R = 6371;
    const latitude1 = current_lat * Math.PI/180;
    const latitude2 = 89.999999 * Math.PI/180;

    const dif_latitude = ( 89.999999  - current_lat) * Math.PI/180;
    const dif_longitude = (0 - current_lng) * Math.PI/180;

    const a = Math.sin(dif_latitude/2) * Math.sin(dif_latitude/2) +
        Math.cos(latitude1) * Math.cos(latitude2) *
        Math.sin(dif_longitude/2) * Math.sin(dif_longitude/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
}

function App() {
    const[latitude, setLatitude] = useState("");
    const[longitude, setLongitude] = useState("");
    const [yourCountry, setYourCountry] = useState(" - ");
    const [yourDistanceToNorthPole, setYourDistanceToNorthPole] = useState(" - ");
    const[enteredLat, setEnteredLat] = useState("");
    const[enteredLng, setEnteredLng] = useState("");
    const [yourDistanceToMoonCore, setYourDistanceToMoonCore] = useState(" - ");
    const [part3SelectedRadio, setPart3SelectedRadio] = useState(true); // true = gps, false = enter
    const[errorMessageA, setErrorMessageA] = useState("");
    const[errorMessageB, setErrorMessageB] = useState("");
    const[errorMessageC, setErrorMessageC] = useState("");

    function setLat(latitude) {
        setLatitude(latitude.target.value);
    }

    function setLng(longitude) {
        setLongitude(longitude.target.value);
    }

    function setEnteredLatitude(lat) {
        setEnteredLat(lat.target.value);
    }

    function setEnteredLongitude(lng) {
        setEnteredLng(lng.target.value);
    }

    function handleRadioButtonChange() {
        setPart3SelectedRadio( !part3SelectedRadio);
    }

    function checkLatLong(lat, long) {
        // check for empty
        if (lat.length <= 0 || long.length <= 0)
            return 1;

        // check for numeric
        if (isNaN(lat) || isNaN(long) )
            return 2;

        // check for invalid coord
        let latF = parseFloat(lat);
        let longF = parseFloat(long);
        if(latF < -90 || latF > 90 || longF < -180 || longF > 180)
            return 3;
        return 0;
    }

    function calculatePartA() {
        console.log(latitude);
        console.log(longitude);
        var lat = latitude.toString();
        var lng = longitude.toString();

        let result = checkLatLong(lat, lng);
        if( result === 1 )
            return setErrorMessageA("Fill both input.");
        else if (result === 2)
            return setErrorMessageA("Input is not a number.");
        else if (result === 3)
            return setErrorMessageA("Coordinate does not exist.");
        else
            setErrorMessageA("");

        var lat_lng = lat + ", " + lng;
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                latlng: lat_lng,
                key:"AIzaSyAS_iGjCeE-h_vsJMYgB4Vme8KCfh0id4U"
            }
        }).then(function (response)
        {
            console.log(response);
            const result = response.data.results[response.data.results.length - 1];
            if(result.types[0] === 'plus_code') {
                return setErrorMessageA("This coordinates are not in a country.");
            }
            let formattedAddress = result.formatted_address;
            console.log(formattedAddress)
            setYourCountry(formattedAddress);
            setErrorMessageA("");
        })
        .catch(function (error){
            alert("Google maps error: " + error.message);
            setErrorMessageA("Google maps error: " + error.message);
        })
    }

    // calculate distance to santa
    async function calculatePartB() {
        if(navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(function (position){
                const distance = calculateDistToNP(position);
                setYourDistanceToNorthPole(distance.toString());
                setErrorMessageB("");
            }, (error) => {
                alert("Geolocation error: " + error.message);
                if( error.message === "User denied Geolocation")
                    setErrorMessageB("Enable your browser's access to GPS of your device.");
                else
                    setErrorMessageB("Geolocation error: " + error.message);
            });
        }
        else {
            console.log("geolocation is not supported");
            setErrorMessageB("Geolocation is not supported.");
        }
    }

    function calculatePartCGPS() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let current_lat = position.coords.latitude;
                let current_lng = position.coords.longitude;
                let currentdate = new Date();
                console.log(currentdate);

                let distance = SunCalc.getMoonPosition(currentdate, current_lat, current_lng).distance;
                setYourDistanceToMoonCore(distance);
                setErrorMessageC("");
            }, (error) => {
                alert("Geolocation error: " + error.message);
                if( error.message === "User denied Geolocation")
                    setErrorMessageB("Enable your browser's access to GPS of your device.");
                else
                    setErrorMessageB("Geolocation error: " + error.message);
            });
        }
        else {
            console.log("geolocation is not supported");
            setErrorMessageC("Geolocation is not supported.");
        }
    }

    function calculatePartCEnter() {
        let result = checkLatLong(enteredLat, enteredLng);
        if( result === 1 )
            return setErrorMessageC("Fill both input.");
        else if (result === 2)
            return setErrorMessageC("Input is not a number.");
        else if (result === 3)
            return setErrorMessageC("Coordinate does not exist.");
        else
            setErrorMessageC("");

        var currentdate = new Date();
        console.log(currentdate);
        var distance = SunCalc.getMoonPosition(currentdate, enteredLat, enteredLng).distance;

        setYourDistanceToMoonCore(distance);
    }

    return (
        <div className="App">
            <Grid container spacing={0}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <h1> CS 458 Project 3</h1>
                    <Paper elevation={3} style={{margin:"3%"}} data-testid="part-a-paper">
                        <h3>Part A</h3>
                        <h4>Enter your coordinates of your location to see your country.</h4>
                        <p data-testid="part-a-paragraph">Your Country: {yourCountry}</p>
                        <p data-testid="part-a-error">{errorMessageA}</p>
                        <TextField
                            id="part-a-field-1-id"
                            label="Latitude"
                            type="text"
                            onChange={setLat}
                            inputProps={{ "data-testid": "part-a-field-1" }}
                            style={{margin:"1%"}}
                        /> <br/>
                        <TextField
                            id="part-a-field-2-id"
                            label="Longitude"
                            type="text"
                            onChange={setLng}
                            inputProps={{ "data-testid": "part-a-field-2" }}
                            style={{margin:"1%"}}
                        /> <br/>

                        <Button variant="contained" onClick={calculatePartA} data-testid="part-a-button" style={{margin:"1%"}}>See Your Country</Button>

                    </Paper>

                    <Paper elevation={3} style={{margin:"3%"}} data-testid="part-b-paper">
                        <h3>Part B</h3>
                        <h4>Click on the button to see your distance to the Geographic North Pole!</h4>
                        <h5>You may need to enable your browser's access to GPS of your device.</h5>
                        <p data-testid="part-b-paragraph">Your Distance To Geographic North Pole: {yourDistanceToNorthPole} km</p>
                        <p data-testid="part-b-error">{errorMessageB}</p>
                        <Button variant="contained" onClick={calculatePartB} data-testid="part-b-button" style={{margin:"1%"}}>Calculate Distance</Button>

                    </Paper>

                    <Paper elevation={3} style={{margin:"3%"}} data-testid="part-c-paper">
                        <h3>Part C</h3>
                        <h4>Click on the button to see your distance to the Moon's Core!</h4>
                        <h5>You may need to enable your browser's access to GPS of your device, if you decide to use the automatic geolocation service. But you may also enter it yourself!</h5>

                        <p data-testid="part-c-paragraph"> Your Distance To The Moon's Core: {yourDistanceToMoonCore} km</p>
                        <p data-testid="part-c-error">{errorMessageC}</p>
                        <FormControl>
                            <FormLabel  id="part-c-radio-buttons-group-label" data-testid="part-c-form-label"
                            >How would you like to give your coordinates?</FormLabel>
                            <RadioGroup
                                aria-labelledby="part-c-radio-buttons-group-label"
                                name="part-c-radio-buttons-group"
                                defaultValue="gps"
                                onChange={handleRadioButtonChange}
                                data-testid="part-c-radio-group"
                            >
                                <FormControlLabel value="gps" control={<Radio data-testid="part-c-radio-1" />}
                                                  label="Get them via GPS." data-testid="part-c-form-control-label-1" />
                                <FormControlLabel value="enter" control={<Radio data-testid="part-c-radio-2" />}
                                                  label="Enter the coordinates yourself." data-testid="part-c-form-control-label-2" />
                            </RadioGroup>
                        </FormControl> <br/>

                        {!part3SelectedRadio && (
                            <div>
                                <TextField
                                    id="part-c-field-1-id"
                                    label="Latitude"
                                    type="text"
                                    onChange={setEnteredLatitude}
                                    inputProps={{ "data-testid": "part-c-field-1" }}
                                    style={{margin: "1%"}}
                                />
                                <br/>
                                <TextField
                                    id="part-c-field-2-id"
                                    label="Longitude"
                                    type="text"
                                    onChange={setEnteredLongitude}
                                    inputProps={{ "data-testid": "part-c-field-2" }}
                                    style={{margin: "1%"}}
                                />
                            </div>
                        )}
                        <Button variant="contained" onClick={part3SelectedRadio ? calculatePartCGPS : calculatePartCEnter}
                                data-testid="part-c-button" style={{marginBottom:"1%", marginTop:"1%"}}>Calculate Distance</Button>
                    </Paper>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </div>
    );
}

export default App;