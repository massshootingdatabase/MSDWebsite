import {useState, useEffect} from 'react';
import axios from 'axios';
import "./Signup.css";
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const Signup = ({history}) => {
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName ] = useState("");

    const [error, setError] = useState("");

    const signupHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/newsletter/signup",
                { email, firstname, lastname },
                config
            );
            

            history.push("/"); 
            Store.addNotification({
                title: "Thank you for signing up for our newsletter!",
                message: "Please complete the process by confirming the subscription in your email inbox.",
                type: "danger",
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
            setTimeout(() =>{
                setError("");
            }, 5000);
        }
    };
    return (
        <>
            <h2>Join Our Newsletter</h2>
            <h3>Subscribe to our newsletter to receive the latest news and products.</h3>
            <form id="contact-form" onSubmit={signupHandler} style={{margin: 10 + '%',marginLeft:5 +'%', width: 350 + 'px'}}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="firstname" 
                        name="firstname" 
                        placeholder="First Name" 
                        value={firstname} 
                        onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input 
                        className="form-control" 
                        id="lastname" 
                        name="lastname" 
                        placeholder="Last Name" 
                        value={lastname} 
                        onChange={(e) => setLastName(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" name="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} required/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
        </>
    );
}

export default Signup;