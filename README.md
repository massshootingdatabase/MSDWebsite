# Stack
Download Node Package Manager (npm)

## Back-end
* Express
* Mongoose - will help backend communicate with MongoDB 
* Mongo Express - GUI for doing stuff with MongoDB
* Jest - will be used for unit testing
* Postman - recommended for testing APIs manually


## Front-end
* React 
* Sass
* GraphQL - We'll keep this as this will allow the frontend to more efficiently make requests
* Tailwind CSS - seems interesting, may not be necessary


# Getting Started on the backend

## Instructions
Make sure you have an [.env file.](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs)

### Type `npm install` to install the dependencies needed to run the project.

## .env and installations requirements
Add a .env file into your project.

### Local MongoDB 
* [Installation instructions](https://www.mongodb.com/docs/manual/administration/install-community/).
* Paste: DB_SERVER=<[YOUR_CONNECTION_STRING](https://www.mongodb.com/docs/manual/reference/connection-string/)> into .env file.

### Json Web Token for User Auth
* run `node` into your command line in the root directory
* Generate a web token by running `require('crypto').randomBytes(35).toString("hex")`
* Paste: `JWT_SECRET=<THE_OUTPUT_STRING>` into .env file.
* Paste: `JWT_EXPIRE=10mins` into .env file. Can be changed to however long authentication should last. 

### Sendgrid configs necessary for the newsletter functions.

Paste all the following into .env
* `EMAIL_SERVICE=SendGrid`
* `EMAIL_USERNAME=apikey`
* `EMAIL_PASSWORD=SG.placeholder-to-run-will-not-work`
* `EMAIL_FROM=dummyEmail@gmail.com`

## Other scripts

### `npm start`

Runs the app in the development mode on a specified .env port or port 5000.

### `npm test`

Launches the JEST test runner.


# Getting started with the frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, client, run:

### `npm install`

Necessary to install the dependencies needed to run the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

