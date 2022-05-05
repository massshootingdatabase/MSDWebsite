import {useState, useEffect} from 'react';
import axios from 'axios';
import "./Dashboard.css";

const Dashboard = ({history}) => {
    const[error, setError] = useState("");
    const[privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/")
        }
    }, [history])
    
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
        <div className='dashboard'>
            <div className='dashboard-container'>
                <h2 > Data Entry Dashboard </h2>
                <div >
                    <hr></hr>
                    <button className='btn btn-primary' onClick={incident}>+ Create Incident</button>            
                </div>
            </div>
        </div>
        
    );
};

export default Dashboard;