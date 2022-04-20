import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./CreateIncident.css";

const CreateIncident = ({history}) => {
    const [incidentId, setIncidentId] = useState(""); //gva id optional
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [deaths, setDeaths] = useState("");
    const [injured, setInjured] = useState("");
    const [description, setDescription] = useState("");
    const [typeList, setTypeList] = useState([]);

    //sources
    const [sourceList, setSourceList] = useState([]);
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    
    //districts
    const [congressional, setCongressional] = useState("");
    const [senate, setSenate] = useState("");
    const [house, setHouse] = useState("");

    //location
    const [placeType, setPlaceType] = useState("");
    const [coordinates, setCoordinates] =  useState("");// [lat, long]
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const[postalCode, setPostalCode] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            history.push("/welcome");
        }
    }, [history]);

    const incidentHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

    };

    return(
        <div className="create-screen">
            <form onSubmit={incidentHandler} className="create-screen__form">
                <h3 className="create-screen__title">Incident Create</h3>
                {error && <span className="error-message">{error}</span>}

                <div className="create-form-group">
                    <label htmlFor="incidentId">GVA ID</label>
                    <input
                        type="incidentId"
                        required
                        id="incidentId"
                        placeholder="Optional"
                        value={incidentId}
                        onChange={(e) => setIncidentId(e.target.value)}
                        tabIndex={1}
                        />
                </div>
                <div className="date-block">
                    <div className="block-container">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="startDate"
                            required
                            id="startDate"
                            placeholder="eg. 2019-12-28T09:53Z"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            tabIndex={2}
                            />
                    </div>
                    <div className="block-container">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="endDate"
                            required
                            id="endDate"
                            placeholder="eg. 2019-12-28T09:53Z"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            tabIndex={3}
                            />
                    </div>
                </div>
                <div className="create-form-group">
                    <label htmlFor="deaths">Number of deaths:</label>
                    <input
                        type="deaths"
                        required
                        id="deaths"
                        placeholder="eg. 5"
                        value={deaths}
                        onChange={(e) => setDeaths(e.target.value)}
                        tabIndex={4}
                        />
                </div>
                <div className="create-form-group">
                    <label htmlFor="injured">Number of injuries
                    </label>
                    <input
                        type="injured"
                        required
                        id="injured"
                        placeholder="eg. 2"
                        value={injured}
                        onChange={(e) => setInjured(e.target.value)}
                        tabIndex={5}
                        />
                </div>
                <div className="create-form-group">
                    <label htmlFor="description">Incident Description
                    </label>
                    <input
                        type="description"
                        required
                        id="description"
                        placeholder="incident name, 'shooter walked up and ..' "
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        tabIndex={5}
                        />
                </div>
                <div className="create-form-group">
                    <label htmlFor="congressional">Districts
                    </label>
                </div>
                <div className="district-form-group">
                    <input
                        type="congressional"
                        required
                        id="congressional"
                        placeholder="Congressional"
                        value={congressional}
                        onChange={(e) => setCongressional(e.target.value)}
                        tabIndex={6}
                        />
                    <input
                        type="senate"
                        required
                        id="senate"
                        placeholder="State Senate"
                        value={senate}
                        onChange={(e) => setSenate(e.target.value)}
                        tabIndex={7}
                    />
                    <input
                        type="house"
                        required
                        id="house"
                        placeholder="State House"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                        tabIndex={8}
                        />
                </div>
                <h3> Location </h3>
                <div className="location-block">
                    
                    <div className="block-container">
                        <label htmlFor="address">Address
                        </label>
                        <input
                            type="address"
                            required
                            id="address"
                            placeholder="street address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            tabIndex={9}
                            />
                    </div>
                    <div className="block-container">
                        <label htmlFor="city">City
                        </label>
                        <input
                            type="city"
                            required
                            id="city"
                            placeholder="eg. Los Angeles"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            tabIndex={10}
                            />
                    </div>
                    <div className="block-container">
                        <label htmlFor="state">State
                        </label>
                        <input
                            type="state"
                            required
                            id="state"
                            placeholder="dropdown list "
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            tabIndex={11}
                            />
                    </div>
                    <div className="block-container">
                        <label htmlFor="postalCode">Place Type
                        </label>
                        <input
                            type="postalCode"
                            required
                            id="postalCode"
                            placeholder="eg. 91790"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            tabIndex={12}
                            />
                    </div>
                    <div className="block-container">
                        <label htmlFor="placeType">Place Type
                        </label>
                        <input
                            type="placeType"
                            required
                            id="placeType"
                            placeholder="should be a dropdown list"
                            value={placeType}
                            onChange={(e) => setPlaceType(e.target.value)}
                            tabIndex={13}
                            />
                    </div>
                    <div className="block-container">
                        <label htmlFor="coordinates">Coordinates
                        </label>
                        <input
                            type="lat"
                            required
                            id="lat"
                            placeholder="latitude"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            tabIndex={14}
                            />
                        <input
                            type="long"
                            required
                            id="long"
                            placeholder="longitude"
                            value={long}
                            onChange={(e) => setLong(e.target.value)}
                            tabIndex={15}
                            />
                    </div>
                
                </div>
                <div className="create-form-group">
                    <label htmlFor="sources">Source
                    </label>
                    <input
                        type="url"
                        required
                        id="url"
                        placeholder="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        tabIndex={16}
                        />
                    <input
                        type="title"
                        required
                        id="title"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        tabIndex={17}
                        />
                </div>
                
                

                <button type="submit" className="btn btn-primary" tabIndex={4}>
                    Create
                </button>


            </form>
        </div>
    )
}



export default CreateIncident;