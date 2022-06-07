import React from 'react';
import "./DataScreen.scss";
import DataTable from 'react-data-table-component';

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
    selector: row => row.gunDeaths,
    sortable: true,
    compact: true,
  },
  {
    name: 'Gun Wounded',
    selector: row => row.gunWounded,
    sortable: true,
    compact: true,
  },
  {
    name: 'Total',
    selector: row => (row.gunDeaths + row.gunWounded),
    sortable: true,
    compact: true,
    maxWidth: "20px",
  },
  {
    name: 'Fatal Victim Names',
    selector: row => row.names,
    compact: true,
    wrap: true,
  },
];

const data = [
  {
      date: "5/30/2021",
      state: "MS",
      city: "Southaven",
      gunDeaths: 2,
      gunWounded: 2,
      names: "Sean Chinn Jr",
  },
  {
    date: "5/19/2021",
    state: "AZ",
    city: "Phoenix",
    gunDeaths: 1,
    gunWounded: 2,
    names: "Margret Kahrer Female 81, John Charles Micco Male 78"
  },
]

//https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--page 

function Data() {
  let moreData = []
  let i = 0
  while (i<10){
    moreData = moreData.concat(data);
    i+=1;
  }
  return (
    <div className="Data">
      <DataTable
            columns={columns}
            data={moreData}
            pagination
        />
    </div>
  )
}

export default Data