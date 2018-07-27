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

//import middleware (power ups)
const cors = require('cors');
const helmet = require('helmet');

//add the middleware (power ups)
server.use(cors());
server.use(helmet());

// routes and stuff ...
server.get('/forecast/location/:lat,:lon', (request, response) => {
    const { lat, lon } = request.params;
    // !longhand version
    // const lat = request.params.lat; 
    // const lon = request.params.lon;
    const requestUrl = urlFormatter.resolve(url, `${lat},${lon}`);
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

// kick off this jam
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});