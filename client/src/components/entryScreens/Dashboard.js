import {useState, useEffect} from 'react';
import axios from 'axios';
import "./Dashboard.css";

const Dashboard = ({history}) => {
    const[error, setError] = useState("");
    const[privateData, setPrivateData] = useState("");
/*
    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/")
        }
    }, [history] )
*/
    
    const incident = () => {
        history.push("/createincident");
    };

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    };

    return error ?(
        <span className="error-message">{error}</span> 
    ) : (
        <>
        <h1 className='dashboard-title'> Data Entry Dashboard </h1>
        <div className='dashboard-container'>
            <hr></hr>
            <button className='btn btn-primary' onClick={incident}>+ Create Incident</button>            
        </div>
        </>
        
    );
};

export default Dashboard;