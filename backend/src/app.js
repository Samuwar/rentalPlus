const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


// to restrict access to api for just a specific website and you can also
//specify what kind of operation they are allowed to use on the api
//middle wares
// const corsOptions = {
//   origin: "https://rentalplus.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
//app.use(cors(corsOptions));

// use these format if you want anyone to access your api
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

//routes


module.exports = app;
