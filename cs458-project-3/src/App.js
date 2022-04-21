import logo from './logo.svg';
import './App.css';

import { Paper, Grid, TextField, Button } from '@mui/material';


function App() {
   // const [yourCountry, setYourCountry] = useState("ExampleYourCountry");

   function calculatePartA() {
      console.log("calculatePartA called!");
   }


  return (
    <div className="App">
      <Grid container spacing={0}>
         <Grid item xs={1}/>
         <Grid item xs={10}>
            <h1> CS 458 Project 3</h1>
            <Paper elevation={3} variant="outlined" style={{margin:"3%"}} data-testid="part-a-paper">
               <h3>Part A</h3>
               <h4>Enter your coordinates of your location to see your country.</h4>

               <TextField
                  required
                  id="outlined-required"
                  label="Latitude"
                  defaultValue="Enter your latitude here..."
                  data-testid="part-a-field-1"
               />
               <TextField
                  required
                  id="outlined-required"
                  label="Longitude"
                  defaultValue="Enter your longitude here..."
                  data-testid="part-a-field-2"
               />

               <Button onClick={calculatePartA} data-testid="part-a-button"> Calculate!</Button>



            </Paper>

            <Paper elevation={3} variant="outlined" style={{margin:"3%"}} data-testid="part-b-paper">
               <h3>Part B</h3>
               <h4>Click on the button to see your distance to the Geographic North Pole!</h4>
               <h5>You may need to enable your browser's access to GPS of your device.</h5>

            </Paper>

            <Paper elevation={3} variant="outlined" style={{margin:"3%"}} data-testid="part-c-paper">
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
