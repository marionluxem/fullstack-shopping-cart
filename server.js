// require the Express module
const express = require("express");

// creates an instance of an Express server
const app = express();

// convert params and body into usable JSON
app.use(express.json());

// server.js, any file with a created and configured Express app
app.use(express.static('./public'));

// import cartItems route
const cart = require('./cartItems');

// use and setup items route
app.use('/cart-items', cart);

// define the port
const port = process.env.PORT || 7878;

// run the server
app.listen(port, () => console.log(`Listening at http://localhost:${port}/ ...`));
