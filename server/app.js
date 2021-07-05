const express = require("express");
const bodyParser = require('body-parser') 
const cors = require('cors') 
const db = require('./mongo.js')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const connectToMongoDB = async () => {await db().then(async (mongoose) => {try{console.log('DB - index: Connected')}finally{mongoose.connection.close}})}//Connect to the database
connectToMongoDB() 

const positionRoute = require("./Routes/position");
const accountRoute = require("./Routes/account")

const app = express()
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/position', positionRoute);
app.use('/account', accountRoute);

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})