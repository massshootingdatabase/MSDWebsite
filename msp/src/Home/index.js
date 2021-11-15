import React from 'react';
import "./style.scss";


import axios from 'axios';


function Home() {
  // console.log( axios.get('/api') ); // example call to api

  return (
    <div className="Home">
    <h2>About the Database</h2>
    <p>
        Our purpose, then official definitions used for the database
    </p>
    
    <h2>Methodology</h2>
    <p>
        How the data is collected, then organized.
    </p>
    <h2>Statistics</h2>
    
    <p>
       A few charts / numbers that convey why this database is important and interesting. 
    </p>
    
    </div>
  );
}


// mapboxgl.accessToken = 'pk.eyJ1IjoiaGlnZ3MzMiIsImEiOiJja3UwZnZtM2gxMDZqMnZvcXU5NHViamloIn0.KlO5rSrT27Ldm_KN6Gvobg';
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/higgs32/ckura4ful05up14o2l242fpoh', // style URL
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: 9 // starting zoom
// });

export default Home