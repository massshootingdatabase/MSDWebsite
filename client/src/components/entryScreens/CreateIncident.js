import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./CreateIncident.css";
import { generateText, validateInput, createElement } from './utils';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const CreateIncident = ({history}) => {
    const [incidentId, setIncidentId] = useState(""); //gva id optional
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [deaths, setDeaths] = useState("");
    const [wounded, setWounded] = useState("");
    const [description, setDescription] = useState("");
    
    //types
    const [incidentType, setIncidentType] = useState({
        homicide: false,
        murderSuicide: false,
        terrorism: false,
        domesticViolence: false,
        gangViolence: false,
        burglary: false,
        schoolShooting: false
    })

    //sources
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    
    //districts
    const [congressional, setCongressional] = useState("");
    const [senate, setSenate] = useState("");
    const [house, setHouse] = useState("");

    //location
    const [placeType, setPlaceType] = useState("residence"); //initialized to residential 
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const[postalCode, setPostalCode] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/")
        }
    }, [history])

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

        const types = getTypes();

        const sources = getSourceList();

        console.log(sources);
        
        try {
            const { data } = await axios.post(
                "/api/incidents/create",
                { start_date, end_date, deaths, wounded, types, description, districts, location, sources},
                config
            );
            
            console.log(data);

            history.push("/dashboard");
            Store.addNotification({
                title: "Incident Created!",
                //message: "Insertion success. Add another .",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000
                }
              });

        } catch (error) {
            setError(error.response.data.error);
            Store.addNotification({
                title: "Error",
                message: "Oops, something went wrong. Please try recreating the incident.",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000
                }
              });
            setTimeout(() =>{
                setError("");
            }, 5000);
        }

    };
    

    const addSrc = (e) => {
        //e.preventDefault();
        const sourceList = document.querySelector('.source-list');
        const outputText = generateText(url, title);
        const element = createElement('li', outputText, 'source-item');
        sourceList.appendChild(element);
        setUrl("");
        setTitle("");
    };

    const getSourceList = () => {
        let list = []
        const sourceList = document.querySelector('.source-list');
        var items = sourceList.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
            const myArray = items[i].textContent.split(", ");
            let u = myArray[1];
            let t = myArray[0];
            list = list.concat({url: u, title: t});
        }
        if(url!== "") {
            list = list.concat({url:url, title:title});
        }
        return list;
    }

    const getTypes = () => {
        let checkArray = [];
        for (var key in incidentType) {
            if (incidentType[key] === true) {
                checkArray.push(key.toString());
            }
        }
        console.log(checkArray);
        return checkArray;
    }

    return(
        <div className="create-screen">
            <form onSubmit={incidentHandler} className="create-screen__form">
                <h1 className="create-screen__title">Incident Create</h1>
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
                
                <div className="create-form-group">
                    <h3 style={{paddingTop : '2ch'}}> Dates </h3>
                    <div className="date">
                        <div className="block-container">
                            <label htmlFor="start_date">Start Date: </label>
                            <input
                                type="start_date"
                                //required
                                id="start_date"
                                placeholder="eg. 2019-12-28T09:53Z"
                                value={start_date}
                                onChange={(e) => setStartDate(e.target.value)}
                                tabIndex={2}
                                />
                        </div>
                        <div className="block-container">
                            <label htmlFor="end_date">End Date: </label>
                            <input
                                type="end_date"
                                //required
                                id="end_date"
                                placeholder="eg. 2019-12-28T09:53Z"
                                value={end_date}
                                onChange={(e) => setEndDate(e.target.value)}
                                tabIndex={3}
                                />
                        </div>
                    </div>
                </div>
                
                <div className="create-form-group">
                    <h3 style={{paddingTop : '2ch'}}> Casualties </h3>
                    <div className="casualties">
                        <label htmlFor="deaths">Deaths:</label>
                        <input
                            type="deaths"
                            //required
                            id="deaths"
                            placeholder="eg. 5"
                            value={deaths}
                            onChange={(e) => setDeaths(e.target.value)}
                            tabIndex={4}
                            />
                        <label htmlFor="wounded">Wounded:
                        </label>
                        <input
                            type="wounded"
                            //required
                            id="wounded"
                            placeholder="eg. 2"
                            value={wounded}
                            onChange={(e) => setWounded(e.target.value)}
                            tabIndex={5}
                            />
                    </div>
                </div>
                
                <div className="create-form-group">
                    <h3 style={{paddingTop : '2ch'}}> Incident Type[s] </h3>
                    <div className="type">
                        <input type="checkbox" id="homicide" name="homicide" onChange={ () => {
                            incidentType.homicide=!incidentType.homicide;
                            setIncidentType(incidentType);
                            console.log(incidentType);
                        }
                            }/>
                        <label htmlFor="homicide"> Homicide</label>
                        <input type="checkbox" id="murder-suicide" name="murder-suicide" onChange={()=>{
                            incidentType.murderSuicide=!incidentType.murderSuicide;
                            setIncidentType(incidentType);
                            console.log(incidentType);
                        }}/>
                        <label htmlFor="murder-suicide"> Murder-Suicide</label>
                        <input type="checkbox" id="terrorism" name="terrorism" onChange={()=>{
                            incidentType.terrorism=!incidentType.terrorism;
                            setIncidentType(incidentType);
                            console.log(incidentType);
                        }}/>
                        <label htmlFor="terrorism"> Terrorism </label>
                        <input type="checkbox" id="domestic violence" name="domestic violence" onChange={()=>{
                            incidentType.domesticViolence=!incidentType.domesticViolence;
                            setIncidentType(incidentType);
                            console.log(incidentType);
                        }}/>
                        <label htmlFor="domestic violence"> Domestic Violence </label>
                        <input type="checkbox" id="gang violence" name="gang violence" onChange={()=>{
                            incidentType.gangViolence=!incidentType.gangViolence;
                            setIncidentType(incidentType);
                            console.log(incidentType);
                        }}/>
                        <label htmlFor="gang violence"> Gang Violence </label>
                        <input type="checkbox" id="burglary" name="burglary" onChange={()=>{
                            incidentType.burglary=!incidentType.burglary;
                            setIncidentType(incidentType);
                            console.log(incidentType);
                        }}/>
                        <label htmlFor="burglary"> Burglary</label>
                        <input type="checkbox" id="school shooting" name="school shooting" onChange={()=>{
                            incidentType.schoolShooting=!incidentType.schoolShooting;
                            setIncidentType(incidentType);
                            console.log(incidentType);
                        }}/>
                        <label htmlFor="school shooting"> School Shooting </label>
                    </div>
                </div>
                <br/>
                <div className="create-form-group">
                    <h3 style={{paddingTop : '2ch'}}> Incident Description </h3>
                    <div className='description'>
                        <input className='description-input'
                            type="description"
                            //required
                            id="description"
                            placeholder="incident name, 'shooter walked up and ..' "
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            tabIndex={5}
                            />
                    </div>
                    
                </div>
                
                <div className="create-form-group">
                    <h3 style={{paddingTop : '2ch'}}> Districts </h3>
                    <div className='district'>
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
                    
                </div>
                
                <div className="create-form-group">
                    <h3 style={{paddingTop : '2ch'}}> Location </h3>
                    <div className='location'>
                        <div className="block-container">
                            <label htmlFor="address">Address
                            </label>
                            <input
                                type="address"
                                //required
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
                                //required
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
                                //required
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
                                //required
                                id="lat"
                                placeholder="latitude"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                tabIndex={14}
                                />
                            <input
                                type="long"
                                //required
                                id="long"
                                placeholder="longitude"
                                value={long}
                                onChange={(e) => setLong(e.target.value)}
                                tabIndex={15}
                                />
                        </div>
                    </div>
                    
                
                </div>
                <div className="create-form-group">
                    <h3 style={{paddingTop : '2ch'}}> Sources </h3>
                    <div className="source">
                        <input
                            type="url"
                            //required
                            id="url"
                            placeholder="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            tabIndex={16}
                            />
                        <input
                            type="title"
                            //required
                            id="title"
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            tabIndex={17}
                            />
                        <button type="button" onClick={addSrc}>Add Another Source</button>
                    </div>
                    <section className="source-output">
                        <ul className="source-list"></ul>
                    </section>
                </div>
                <div className="create-form-group">
                    <button type="submit" className="btn btn-primary" tabIndex={4}>
                        Create
                    </button>
                </div>
                
            </form>
        </div>
    )
}



export default CreateIncident;