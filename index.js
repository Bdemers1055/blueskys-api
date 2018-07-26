const express = require('express');
const server = express();

// define the port heroku needs the first part
const port = process.env.PORT || 9009;

//import middleware (power ups)
const cors = require('cors');

//add the middleware (power ups)
server.use(cors());

// routes and stuff ...

// kick off this jam
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});