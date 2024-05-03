const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const connection= require("./db/connection")
require("dotenv").config();

const adminRoute = require("./router/admin");
const tournamentRoute = require("./router/tournament");
const userRoute = require("./router/user");



const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/admin",adminRoute);
app.use("/tournament",tournamentRoute);
app.use("/user",userRoute);

app.get((req,res)=>{
    res.json("hello");
})


app.listen(Process.env.PORT || 3000,()=>{
    connection();
    console.log("server is listening on port 3000");
})

module.exports = app;