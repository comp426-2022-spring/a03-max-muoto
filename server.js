const express = require('express');
const minimist = require('minimist');

const app = express()
const argv = (minimist)(process.argv.slice(2));

argv["port"];
const HTTP_PORT = argv.port || 5000;

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});




// Define Check Endpoints
app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});