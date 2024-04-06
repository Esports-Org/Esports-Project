const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const connection= require("./db/connection")
require("dotenv").config();


const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.listen(3000,()=>{
    connection();
    console.log("server is listening on port 3000");
})

module.exports = app;