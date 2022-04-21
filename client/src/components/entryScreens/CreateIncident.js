import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./CreateIncident.css";

const CreateIncident = ({history}) => {
    const [incidentId, setIncidentId] = useState(""); //gva id optional
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [deaths, setDeaths] = useState("");
    const [wounded, setWounded] = useState("");
    const [description, setDescription] = useState("");
    const [types, setTypes] = useState([]);

    //sources
    const [sources, setSources] = useState([]);
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    
    //districts
    const [congressional, setCongressional] = useState("");
    const [senate, setSenate] = useState("");
    const [house, setHouse] = useState("");

    //location
    const [placeType, setPlaceType] = useState("");
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

        const districts = {
            congressional: congressional,
            state_senate: senate,
            state_house: house
        }
        
        const location = {
            place_type: placeType,
            coordinates: [lat, long],
            address: address,
            city: city,
            state: state,
            postalCode: postalCode
        }

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/incidents/create",
                { start_date, end_date, deaths, wounded, types, description, districts, location, sources},
                config
            );

            history.push("/dashboard");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() =>{
                setError("");
            }, 5000);
        }

    };

    const addSrc = (e) => {
        e.preventDefault();
        const newList = sources.concat({url:url, title:title})
        setSources(newList);

        setUrl("");
        setTitle("");
        
        console.log(sources);
    }

    return(
        <div className="create-screen">
            <form onSubmit={incidentHandler} className="create-screen__form">
                <h3 className="create-screen__title">Incident Create</h3>
                {error && <span className="error-message">{error}</span>}

                <div className="create-form-group">
                    <label htmlFor="incidentId">GVA ID</label>
                    <input
                        type="incidentId"
                        id="incidentId"
                        placeholder="Optional"
                        value={incidentId}
                        onChange={(e) => setIncidentId(e.target.value)}
                        tabIndex={1}
                        />
                </div>
                <div className="date-block">
                    <div className="block-container">
                        <label htmlFor="start_date">Start Date</label>
                        <input
                            type="start_date"
                            required
                            id="start_date"
                            placeholder="eg. 2019-12-28T09:53Z"
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                            tabIndex={2}
                            />
                    </div>
                    <div className="block-container">
                        <label htmlFor="end_date">End Date</label>
                        <input
                            type="end_date"
                            required
                            id="end_date"
                            placeholder="eg. 2019-12-28T09:53Z"
                            value={end_date}
                            onChange={(e) => setEndDate(e.target.value)}
                            tabIndex={3}
                            />
                    </div>
                </div>
                <div className="date-block">
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
                    <label htmlFor="wounded">Number of injuries
                    </label>
                    <input
                        type="wounded"
                        required
                        id="wounded"
                        placeholder="eg. 2"
                        value={wounded}
                        onChange={(e) => setWounded(e.target.value)}
                        tabIndex={5}
                        />
                </div>
                <div>
                    <label htmlFor="types">Incident Type[s]:</label>
                    <input type="checkbox" id="homicide" name="homicide" value="homicide"/>
                    <label for="homicide"> Homicide</label>
                    <input type="checkbox" id="murder-suicide" name="murder-suicide" value="murder-suicide"/>
                    <label for="murder-suicide"> Murder-Suicide</label>
                    <input type="checkbox" id="terrorism" name="terrorism" value="terrorism"/>
                    <label for="terrorism"> Terrorism </label>
                    <input type="checkbox" id="domestic violence" name="domestic violence" value="domestic violence"/>
                    <label for="domestic violence"> Domestic Violence </label>
                    <input type="checkbox" id="gang violence" name="gang violence" value="gang violence"/>
                    <label for="gang violence"> Gang Violence </label>
                    <input type="checkbox" id="burglary" name="burglary" value="burglary"/>
                    <label for="burglary"> Burglary</label>
                    <input type="checkbox" id="school shooting" name="school shooting" value="school shooting"/>
                    <label for="school shooting"> School Shooting </label>
                </div>
                <br/>
                <div>
                    <label htmlFor="description">Incident Description
                    </label>
                    <input className='description-input'
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
                        id="congressional"
                        placeholder="Congressional"
                        value={congressional}
                        onChange={(e) => setCongressional(e.target.value)}
                        tabIndex={6}
                        />
                    <input
                        type="senate"
                        id="senate"
                        placeholder="State Senate"
                        value={senate}
                        onChange={(e) => setSenate(e.target.value)}
                        tabIndex={7}
                    />
                    <input
                        type="house"
                        id="house"
                        placeholder="State House"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                        tabIndex={8}
                        />
                </div>
                <h3 style={{paddingTop : '2ch'}}> Location </h3>
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
                        <select type="state" required id="state" onChange={(e) => setState(e.target.value)} tabIndex={11}>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <div className="block-container">
                        <label htmlFor="postalCode">Postal Code
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
                        <select name="placeType" id="placeType" onChange={(e) => setPlaceType(e.target.value)}>
                            <option value="residence">Residence</option>
                            <option value="place of worship">Place of worship</option>
                            <option value="bar">Bar</option>
                            <option value="shopping center">Shopping Center</option>
                            <option value="highway">Highway</option>
                            <option value="park">Park</option>
                            <option value="street">Street</option>
                            <option value="school">School</option>
                            <option value="store">Store</option>
                            <option value="gas station">Gas Station</option>
                            <option value="office">Office</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="nightClub">Nightclub</option>
                            <option value="concert">Concert</option>
                            <option value="theater">Theater</option>
                            <option value="government building">Government Building</option>
                            <option value="other">Other</option>
                        </select>
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
                <div className="source-block">
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
                    <button type="button" onClick={addSrc}>Add Another Source</button>
                </div>
                <button type="submit" className="btn btn-primary" tabIndex={4}>
                    Create
                </button>


            </form>
        </div>
    )
}



export default CreateIncident;