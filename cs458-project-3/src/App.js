import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from "axios";

import { Paper, Grid, TextField, Button, RadioGroup, FormControlLabel, FormControl, FormLabel, Radio } from '@mui/material';
import SunCalc from "suncalc";


function App() {
    const[latitude, setLatitude] = useState("");
    const[longitude, setLongitude] = useState("");
    const [yourCountry, setYourCountry] = useState("ExampleYourCountry");
    const [yourDistanceToNorthPole, setYourDistanceToNorthPole] = useState("ExampleDistanceToNorthPole");
    const[enteredLat, setEnteredLat] = useState("");
    const[enteredLng, setEnteredLng] = useState("");
    const [yourDistanceToMoonCore, setYourDistanceToMoonCore] = useState("ExampleDistanceToMoonCore");
    const [part3SelectedRadio, setPart3SelectedRadio] = useState(true); // true = gps, false = enter

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

    // todo
    function calculatePartA() {
        console.log(latitude);
        console.log(longitude);
        var lat = latitude.toString();
        var lng = longitude.toString();
        var lat_lng = lat + ", " + lng;
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                latlng: lat_lng,
                key:"AIzaSyAS_iGjCeE-h_vsJMYgB4Vme8KCfh0id4U"
            }
        })
            .then(function (response){
                console.log(response);
                var formattedAdress = response.data.results[response.data.results.length - 1].formatted_address
                console.log(formattedAdress)
                setYourCountry(formattedAdress);
            })
            .catch(function (error){
                console.log(error);
            })
        console.log("calculatePartA called!");
    }

    // calculate distance to santa
    function calculatePartB() {
        var current_lat = 0;
        var current_lng = 0;

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position){
                current_lat = position.coords.latitude;
                current_lng = position.coords.longitude;

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

                setYourDistanceToNorthPole(distance.toString());

            });
        }
        else {
            console.log("geallocation is not supported");
        }

        console.log("calculatePartB called!");

    }

    // todo
    function calculatePartCGPS() {
        console.log("calculatePartCGPS called!");
        var current_lat = 0;
        var current_lng = 0;

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position){
                current_lat = position.coords.latitude;
                current_lng = position.coords.longitude;
                var currentdate = new Date();
                console.log(currentdate);
                var SunCalc = require('suncalc');
                var distance = SunCalc.getMoonPosition(currentdate, current_lat, current_lng).distance;
                setYourDistanceToMoonCore(distance);
            });
        }
        else {
            console.log("geallocation is not supported");
        }

    }

    // todo
    function calculatePartCEnter() {
        var currentdate = new Date();
        console.log(currentdate);
        var SunCalc = require('suncalc');
        var distance = SunCalc.getMoonPosition(currentdate, enteredLat, enteredLng).distance;

        setYourDistanceToMoonCore(distance);

    }

    function handleRadioButtonChange() {
        setPart3SelectedRadio( !part3SelectedRadio);

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

                        { (yourCountry !== "ExampleYourCountry") &&
                            <p data-testid="part-a-paragraph">Your Country: {yourCountry}</p>
                        }

                        <TextField
                            id="part-a-field-1-id"
                            label="Latitude"
                            type="text"
                            onChange={setLat}
                            // autoComplete="current-password"
                            inputProps={{ "data-testid": "part-a-field-1" }}
                            style={{margin:"1%"}}
                        /> <br/>
                        <TextField
                            id="part-a-field-2-id"
                            label="Longitude"
                            type="text"
                            onChange={setLng}
                            // autoComplete="current-password"
                            inputProps={{ "data-testid": "part-a-field-2" }}
                            style={{margin:"1%"}}
                        /> <br/>

                        <Button variant="contained" onClick={calculatePartA} data-testid="part-a-button" style={{margin:"1%"}}>See Your Country</Button>



                    </Paper>

                    <Paper elevation={3} style={{margin:"3%"}} data-testid="part-b-paper">
                        <h3>Part B</h3>
                        <h4>Click on the button to see your distance to the Geographic North Pole!</h4>
                        <h5>You may need to enable your browser's access to GPS of your device.</h5>

                        { (yourDistanceToNorthPole !== "ExampleDistanceToNorthPole") &&
                            <p data-testid="part-b-paragraph">Your Distance To Geographic North Pole: {yourDistanceToNorthPole}</p>
                        }

                        <Button variant="contained" onClick={calculatePartB} data-testid="part-b-button" style={{margin:"1%"}}>Calculate Distance</Button>

                    </Paper>

                    <Paper elevation={3} style={{margin:"3%"}} data-testid="part-c-paper">
                        <h3>Part C</h3>
                        <h4>Click on the button to see your distance to the Moon's Core!</h4>
                        <h5>You may need to enable your browser's access to GPS of your device, if you decide to use the automatic geolocation service. But you may also enter it yourself!</h5>

                        { (yourDistanceToMoonCore !== "ExampleDistanceToMoonCore") &&
                            <p data-testid="part-c-paragraph"> Your Distance To The Moon's Core: {yourDistanceToMoonCore}</p>
                        }

                        <FormControl>
                            <FormLabel  id="part-c-radio-buttons-group-label" data-testid="part-c-form-label" >How would you like to give your coordinates?</FormLabel>
                            <RadioGroup
                                aria-labelledby="part-c-radio-buttons-group-label"
                                name="part-c-radio-buttons-group"
                                defaultValue="gps"
                                onChange={handleRadioButtonChange}
                                data-testid="part-c-radio-group"
                            >
                                <FormControlLabel value="gps" control={<Radio data-testid="part-c-radio-1" />} label="Get them via GPS." data-testid="part-c-form-control-label-1" />
                                <FormControlLabel value="enter" control={<Radio data-testid="part-c-radio-2" />} label="Enter the coordinates yourself." data-testid="part-c-form-control-label-2" />
                            </RadioGroup>
                        </FormControl> <br/>

                        {!part3SelectedRadio &&

                            <TextField
                                id="part-c-field-1-id"
                                label="Latitude"
                                type="text"
                                onChange={setEnteredLatitude}
                                // autoComplete="current-password"
                                inputProps={{"data-testid": "part-c-field-1"}}
                                style={{margin: "1%"}}
                            />
                        }
                        {!part3SelectedRadio && <br/>  }

                        { !part3SelectedRadio &&
                            <TextField
                                id="part-c-field-2-id"
                                label="Longitude"
                                type="text"
                                onChange={setEnteredLongitude}
                                // autoComplete="current-password"
                                inputProps={{ "data-testid": "part-c-field-2" }}
                                style={{margin:"1%"}}
                            />
                        }

                        {!part3SelectedRadio && <br/>  }


                        { part3SelectedRadio &&
                            <Button variant="contained" onClick={calculatePartCGPS} data-testid="part-c-button-1" style={{margin:"1%"}}>Calculate Distance</Button>
                        }
                        { !part3SelectedRadio &&
                            <Button variant="contained" onClick={calculatePartCEnter} data-testid="part-c-button-2" style={{margin:"1%"}}>Calculate Distance</Button>
                        }


                    </Paper>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </div>
    );
}

export default App;