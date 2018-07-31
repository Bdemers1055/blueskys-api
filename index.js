const express = require('express');
const server = express();
const axios = require('axios');
const urlFormatter = require('url');

//load environment variables
require('dotenv').config();

// define the port -> heroku needs the first part
const port = process.env.PORT || 9009;

// define base url for darksky
const apikey = process.env.API_KEY;
const url = `https://api.darksky.net/forecast/${apikey}/`;
const googleurl = `https://maps.googleapis.com/maps/api/geocode/json?address=`;

//import middleware (power ups)
const cors = require('cors');
const helmet = require('helmet');

//add the middleware (power ups)
server.use(cors());
server.use(helmet());

// darksky forecast route ...
server.get('/forecast/location/:lat,:lng', (request, response) => {
    const { lat, lng } = request.params;
    const requestUrl = urlFormatter.resolve(url, `${lat},${lng}`);
    axios.get(requestUrl)
         .then(weather => {
             response.status(200).json(weather.data);
         })
         .catch(error => {
             response.status(500).json ({ 
                 msg: "don't look now, but there is a TORNADO behind you!!"
                });
         });
});

// googlemaps route ...
server.get('/forecast/location/address/:address', (request, response) => {
    const { address } = request.params;
    const requestUrl = (googleurl + `${address}`);
    console.log(requestUrl)
    axios.get(requestUrl)
         .then(address => {
             console.log(address)
             response.status(200).json(address.data);
         })
         .catch(error => {
             response.status(500).json ({ 
                 msg: "address not found"
                });
         });
});

// kick off this jam
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});