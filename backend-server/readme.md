# Instructions
Make sure you have an [.env file.](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs)
Type `node index.js` to run the server!

# To test the email server
Use this example CURL call to test the email server.
`curl -X POST  -d "from=test@email.com&subject=TEST&text=test" http://localhost:5000/api/email`

