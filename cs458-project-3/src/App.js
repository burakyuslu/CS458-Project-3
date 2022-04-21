import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import { Paper, Grid, TextField, Button } from '@mui/material';


function App() {
   const [yourCountry, setYourCountry] = useState("ExampleYourCountry");
   const [yourDistanceToNorthPole, setYourDistanceToNorthPole] = useState("ExampleDistanceToNorthPole");
   const [yourDistanceToMoonCore, setYourDistanceToMoonCore] = useState("ExampleDistanceToMoonCore");


   // todo
   function calculatePartA() {
      console.log("calculatePartA called!");

      let yourCountryNew = "calculatedYourCountry";
      // calculate yourCountry
      setYourCountry(yourCountryNew);
   }

   // todo
   function calculatePartB() {
      console.log("calculatePartA called!");

      let yourDistanceToNorthPoleNew = "calculatedDistanceToNorthPole";

      setYourDistanceToNorthPole(yourDistanceToNorthPoleNew);
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
                  <p> Your Country: {yourCountry}</p>
               }

               <TextField
                  id="part-a-field-1-id"
                  label="Latitude"
                  // type="text"
                  // autoComplete="current-password"
                  data-testid="part-a-field-1"
                  style={{margin:"1%"}}
               /> <br/>
               <TextField
                  id="part-a-field-2-id"
                  label="Longitude"
                  // type="text"
                  // autoComplete="current-password"
                  data-testid="part-a-field-2"
                  style={{margin:"1%"}}
               /> <br/>

               <Button variant="contained" onClick={calculatePartA} data-testid="part-a-button" style={{margin:"1%"}}>See Your Country</Button>



            </Paper>

            <Paper elevation={3} style={{margin:"3%"}} data-testid="part-b-paper">
               <h3>Part B</h3>
               <h4>Click on the button to see your distance to the Geographic North Pole!</h4>
               <h5>You may need to enable your browser's access to GPS of your device.</h5>

               { (yourDistanceToNorthPole !== "ExampleDistanceToNorthPole") &&
                  <p> Your Distance To Geographic North Pole: {yourDistanceToNorthPole}</p>
               }

               <Button variant="contained" onClick={calculatePartB} data-testid="part-a-button" style={{margin:"1%"}}>Calculate Distance</Button>

            </Paper>

            <Paper elevation={3} style={{margin:"3%"}} data-testid="part-c-paper">
               <h3>Part C</h3>
               <h4>Click on the button to see your distance to the Moon's Core!</h4>
               <h5>You may need to enable your browser's access to GPS of your device, if you decide to use the automatic geolocation service. But you may also enter it yourself!</h5>

            </Paper>
         </Grid>
         <Grid item xs={1}/>
      </Grid>
    </div>
  );
}

export default App;
