import React from 'react';
import { useState } from 'react';
import "./style.scss";
import mspBanner from "./Photos/mspBanner.png";

// import axios from 'axios';

function Home({history}) {
  // console.log( axios.get('/api') ); // example call to api
  const[error, setError] = useState("");

  const subscribe = () => {
    history.push("/signup");
  }

  return (
    <div className="Home">

      <img className="banner" src={mspBanner} alt="Banner"/>

      <div className='who-we'>
        <h3>Who we are.</h3>
        <p>
          We are a volunteer organization made up of members all over the United States. Many of our volunteers are students from colleges and universities across the country. No special skills are required to join our volunteer team, just a passion to end mass shootings. 
        </p>
      </div>
      

      <div className="subscribe">
        <h4 className='dashboard-title'> Subscribe to our newsletter to stay up to date with the orgnaization's latest! </h4>
        <hr></hr>
        <button className='subscribe-btn' onClick={subscribe}>Subscribe</button>            
      </div>
    </div>
  );
}
/* Omitted Information

        <h2>Methodology</h2>
      <p>
          How the data is collected, then organized.
      </p>

      <h2>Statistics</h2>
      <p>
        A few charts / numbers that convey why this database is important and interesting. 
      </p>

      <h2>FAQ</h2>

      <h3>Doesn’t a database of mass shootings already exist?</h3>
      <p>
      Yes, and no. There are many great resources that list mass shootings in the United States. Unfortunately, none of them provide all of the information that Mass Shooting Database is including. Some do not include domestic or gang violence, some do not include any incidents before 2014, and many have different definitions of mass shootings. Mass Shooting Database will include all of this and more. 
      </p>

      <h3>What is a mass shooting?</h3>
      <p>
      There are many definitions of “mass shooting”. Mass Shooting Database defines a mass shooting as any shooting incident in which at least one is killed and at least three are killed or injured, excluding the perpetrator. One characteristic that will make Mass Shooting Database unique is the ability for the user to filter search results by various definition. 
      </p>


*/


// mapboxgl.accessToken = 'pk.eyJ1IjoiaGlnZ3MzMiIsImEiOiJja3UwZnZtM2gxMDZqMnZvcXU5NHViamloIn0.KlO5rSrT27Ldm_KN6Gvobg';
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/higgs32/ckura4ful05up14o2l242fpoh', // style URL
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: 9 // starting zoom
// });

export default Home