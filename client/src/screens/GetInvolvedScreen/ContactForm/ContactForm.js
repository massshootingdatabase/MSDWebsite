import React from "react";
import "./ContactForm.scss";

function ContactForm() {
  // we'll have to change the url in action in production
  return (
    <form
      class="contactForm"
      method="post"
      action="http://localhost:5000/api/email"
      enctype="application/x-www-form-urlencoded"
    >
      <div class="contact_form_element">
        <label for="from">Email: </label>
        <input
          id="from"
          type="email"
          name="from"
          required
          placeholder="example@email.com"
        />
      </div>
      <div class="contact_form_element">
        <label for="subject">Subject: </label>
        <input
          id="subject"
          type="text"
          name="subject"
          required
          placeholder="Subject..."
        />
      </div>
      <div class="contact_form_element">
        <div id="contact_message">
          <label for="message">Message:</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Your message here..."
            minlength="20"
          ></textarea>
        </div>
      </div>
      <input type="submit" value="Send" />
    </form>
  );
}

export default ContactForm;
