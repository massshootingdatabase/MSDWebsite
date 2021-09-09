import React from 'react';
import "./style.scss";
import ContactForm from './ContactForm';

function GetInvolved() {
  return (
    <div className="getInvolved">   
    <h2>Call to Action</h2>
    <p>
        Next steps for people who want to do something!
    </p>

    <h2>Contact Us!</h2>
    <p>
        Report an error or send us a message.
    </p>
    <ContactForm />
    </div>
    
  )
}

export default GetInvolved
