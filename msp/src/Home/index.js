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

export default Home