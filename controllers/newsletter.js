
const sendEmail = require("../utils/sendEmail");
const ErrorResponse = require("../utils/errorResponse");

const sgClient = require('@sendgrid/client');
sgClient.setApiKey(process.env.EMAIL_PASSWORD);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_PASSWORD);

exports.signup = async (req, res, next) => {
    // Routes
    const confNum = randNum();
    const params = new URLSearchParams({
      conf_num: confNum,
      email: req.body.email,
    });
    const confirmationURL = req.protocol + '://' + req.headers.host + 'api/newsletter/confirm/?' + params;

    const msg = 
    {
      "from": process.env.EMAIL_FROM,
      "to": req.body.email,
      "template_id": "d-3ba13d52c1a74f908f8c60ad0e41a7c6",
      "dynamic_template_data": {
          "firstname": req.body.firstname,
          "lastname": req.body.lastname,
          "confirmationUrl": confirmationURL
          }
    };

    try {
      await addContact(req.body.firstname, req.body.lastname, req.body.email, confNum);
      await sgMail.send(msg);
     
      res.status(200).json({ success: true, data: "Contact added. Email Sent" });
    }   
    catch(error) {
      next(error);
    }
};
   
   function randNum() {
    return Math.floor(Math.random() * 90000) + 10000;
   }
   
   async function addContact(firstName, lastName, email, confNum) {
    const customFieldID = await getCustomFieldID('conf_num');
    const data = {
      "contacts": [{
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "custom_fields": {}
      }]
    };
    data.contacts[0].custom_fields[customFieldID] = confNum;
    const request = {
      url: `/v3/marketing/contacts`,
      method: 'PUT',
      body: data
    }
    return sgClient.request(request);
   }
   
   async function getCustomFieldID(customFieldName) {
    const request = {
      url: `/v3/marketing/field_definitions`,
      method: 'GET',
    }
    const response = await sgClient.request(request);
    const allCustomFields = response[1].custom_fields;
    return allCustomFields.find(x => x.name === customFieldName).id;
   }
   
exports.confirm = async (req, res, next) => {
    try {
        const contact = await getContactByEmail(req.query.email);
        if(contact == null) throw `Contact not found.`;
        if (contact.custom_fields.conf_num ==  req.query.conf_num) {
          const listID = await getListID('Newsletter Subscribers');
          await addContactToList(req.query.email, listID);
        } else {
          throw 'Confirmation number does not match';
        }
        //.render('message', { message: 'You are now subscribed to our newsletter. We can\'t wait for you to hear from us!' });
        res.status(200).json({ success: true, data: "Subscribed!" });
    } catch (error) {
        return next(new ErrorResponse("Subscription was unsuccessful", 500));
        //.render('message', { message: 'Subscription was unsuccessful. Please <a href="/signup">try again.</a>' });
    }
};

    async function getContactByEmail(email) {
        const data = {
        "emails": [email]
        };
        const request = {
        url: `/v3/marketing/contacts/search/emails`,
        method: 'POST',
        body: data
        }
        const response = await sgClient.request(request);
        if(response[1].result[email]) return response[1].result[email].contact;
        else return null;
   }
   
   async function getListID(listName) {
        const request = {
        url: `/v3/marketing/lists`,
        method: 'GET',
        }
        const response = await sgClient.request(request);
        const allLists = response[1].result;
        return allLists.find(x => x.name === listName).id;
   }
   
   async function addContactToList(email, listID) {
        const data = {
        "list_ids": [listID],
        "contacts": [{
            "email": email
        }]
        };
        const request = {
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: data
        }
        return sgClient.request(request);
   }
   
/*   
exports.upload = async (req, res) => {
    const listID = await getListID('Newsletter Subscribers');
    const htmlNewsletter = req.files.newsletter.data.toString();
    await sendNewsletterToList(req, htmlNewsletter, listID)
    res.render('message', { message: 'Newsletter has been sent to all subscribers.' });
};

async function sendNewsletterToList(req, htmlNewsletter, listID) {
    const data = {
      "query": `CONTAINS(list_ids, '${listID}')`
    };
    const request = {
      url: `/v3/marketing/contacts/search`,
      method: 'POST',
      body: data
    }
    const response = await sgClient.request(request);
    for (const subscriber of response[1].result) {
      const params = new URLSearchParams({
        conf_num: subscriber.custom_fields.conf_num,
        email: subscriber.email,
      });
      const unsubscribeURL = req.protocol + '://' + req.headers.host + '/delete/?' + params;
      const msg = {
        to: subscriber.email, // Change to your recipient
        from: "SENDER_EMAIL", // Change to your verified sender
        subject: req.body.subject,
        html: htmlNewsletter + `<a href="${unsubscribeURL}"> Unsubscribe here</a>`,
      }
      sgMail.send(msg);
    }
}

exports.del = async (req, res) => {
    try {
        const contact = await getContactByEmail(req.query.email);
        if(contact == null) throw `Contact not found.`;
        if (contact.custom_fields.conf_num ==  req.query.conf_num) {
            const listID = await getListID('Newsletter Subscribers');
            await deleteContactFromList(listID, contact);
            //.render('message', { message: 'You have been successfully unsubscribed. If this was a mistake re-subscribe <a href="/signup">here</a>.' });
            res.status(200).json({ success: true, data: "Successfully unsubscribed!" });
        }
        else throw 'Confirmation number does not match or contact is not subscribed'
    } catch(error) {
        next(new ErrorResponse("Could not unsubscribe", 500));
    }     
};

async function deleteContactFromList(listID, contact) {
    const request = {
      url: `/v3/marketing/lists/${listID}/contacts`,
      method: 'DELETE',
      qs: {
        "contact_ids": contact.id
      }
    }
    await sgClient.request(request);
}
   */