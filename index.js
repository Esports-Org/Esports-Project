const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors())

const app = express()
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})

module.exports = app;