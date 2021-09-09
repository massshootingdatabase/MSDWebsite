import React from 'react';
import "./style.scss";

function ContactForm() {
  return (
    <form class="contactForm">
        <div class="contact_form_element">
            <label for="email">Email: </label>
            <input id="email" type="email" required placeholder="example@email.com" />
        </div>
        <div class="contact_form_element">
            <label for="subject">Subject: </label>
            <input id="subject" type="text" required placeholder="Subject..."/>
        </div>
        <div class="contact_form_element">
            <div id="contact_message">
                <label for="message">Message:</label>
                <textarea id="message" required placeholder="Your message here..." minlength="20"></textarea>
                
            </div>
        </div>

        <input type="submit" value="Send"/>
    </form>
  )
}

export default ContactForm
