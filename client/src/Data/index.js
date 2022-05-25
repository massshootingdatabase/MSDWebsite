import { React, useState } from "react";
import "./style.scss";
import DataTable from 'react-data-table-component';
import axios from "axios";

const columns = [
  {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
      compact: true,
  },
  {
    name: 'State',
    selector: row => row.state,
    sortable: true,
    compact: true,
    maxWidth: "20px",
  },
  {
    name: 'City',
    selector: row => row.city,
    compact: true,
    wrap: true,
  },
  {
    name: 'Gun Deaths',
    selector: row => row.deaths,
    sortable: true,
    compact: true,
  },
  {
    name: 'Gun Wounded',
    selector: row => row.wounded,
    sortable: true,
    compact: true,
  },
  {
    name: 'Total',
    selector: row => (row.deaths + row.wounded),
    sortable: true,
    compact: true,
    maxWidth: "20px",
  },
  {
    name: 'ID',
    selector: row => row.id,
    compact: true,
    wrap: true,
  },
];

//https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--page 

const Data = () => {
  const [error, setError] = useState();
  const [results, setResults] = useState();

  const SearchBar = () => (
    <form onSubmit={searchHandler}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search incidents</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search incidents"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
  );
  let incidentsList = []

  const searchHandler = async (e) => {
    e.preventDefault();

    try {
        const { data } = await axios.post(
            "/api/incidents/get"
        );
        console.log(data);
        if(data !== undefined && data.Incident.length>0){
          data.Incident.forEach(d => {
            const {start_date, location, deaths, wounded, _id} = d;

            const incident = {
              date: start_date,
              state: location.state,
              city: location.city,
              deaths: deaths,
              wounded: wounded,
              id: _id,
            }
            console.log(incident);

            incidentsList = incidentsList.concat(incident);
          });
          console.log(incidentsList);
          setResults(<DataTable
            columns={columns}
            data={incidentsList}
            pagination
          />);
        }
    } catch (error) {
      console.log(error);
        setError(error.response.data.error);
        setTimeout(() =>{
            setError("");
        }, 5000);
    }
  };

  return (
    <div className="Data">
      <div className="search">
        <SearchBar/>
      </div>
      {results}
    </div>
  )
}

export default Data