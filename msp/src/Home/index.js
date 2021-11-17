import React from 'react';
import "./style.scss";
import mspBanner from "./Photos/mspBanner.png";


// import axios from 'axios';


function Home() {
  // console.log( axios.get('/api') ); // example call to api

  return (
    <div className="Home">

      <h1>Welcome to Mass Shooting Database</h1>
      <p>
      Mass Shooting Database is a nonpartisan, nonprofit organization committed to creating a comprehensive database of mass shootings in the United States. 
      </p>

      <img src={mspBanner} alt="Banner"/>
      
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

      <h3>Who is Mass Shooting Database?</h3>
      <p>
      We are a volunteer organization made up of volunteers all over the United States. Many of our volunteers are students from colleges and universities across the country. No special skills are required to join our volunteer team, just a passion to end mass shootings. 
      </p>
      
    </div>
  );
}

export default Home