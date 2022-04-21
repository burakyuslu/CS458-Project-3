import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import { Paper, Grid, TextField, Button, RadioGroup, FormControlLabel, FormControl, FormLabel, Radio } from '@mui/material';


function App() {
   const [yourCountry, setYourCountry] = useState("ExampleYourCountry");
   const [yourDistanceToNorthPole, setYourDistanceToNorthPole] = useState("ExampleDistanceToNorthPole");
   const [yourDistanceToMoonCore, setYourDistanceToMoonCore] = useState("ExampleDistanceToMoonCore");

   const [part3SelectedRadio, setPart3SelectedRadio] = useState(true); // true = gps, false = enter


   // todo
   function calculatePartA() {
      console.log("calculatePartA called!");

      let yourCountryNew = "calculatedYourCountry";
      // calculate yourCountry
      setYourCountry(yourCountryNew);
   }

   // calculate distance to santa
   function calculatePartB(entered_latitude_1, entered_longitude_1, entered_latitude_2, entered_longitude_2) {
      console.log("calculatePartB called!");

      const R = 6371e3;
      const latitude1 = entered_latitude_1 * Math.PI/180;
      const latitude2 = entered_latitude_2 * Math.PI/180;

      const dif_latitude = (entered_latitude_2 - entered_latitude_1) * Math.PI/180;
      const dif_longitude = (entered_longitude_2 - entered_longitude_1) * Math.PI/180;

      const a = Math.sin(dif_latitude/2) * Math.sin(dif_latitude/2) +
          Math.cos(latitude1) * Math.cos(latitude2) *
          Math.sin(dif_longitude/2) * Math.sin(dif_longitude/2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;

      setYourDistanceToNorthPole(distance.toString());
   }

   // todo
   function calculatePartCGPS() {
      console.log("calculatePartCGPS called!");

      setYourDistanceToMoonCore("Aya daha cok var.");

   }

   // todo
   function calculatePartCEnter() {
      console.log("calculatePartCEnter called!");


      setYourDistanceToMoonCore("Aya cok var.");

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
                  // type="text"
                  // autoComplete="current-password"
                  inputProps={{ "data-testid": "part-a-field-1" }}
                  style={{margin:"1%"}}
               /> <br/>
               <TextField
                  id="part-a-field-2-id"
                  label="Longitude"
                  // type="text"
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
                     // type="text"
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
                     // type="text"
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
