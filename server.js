const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json())

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Mongodb connection established');
})

const studentRouter = require('./routes/students');


app.use('/student', studentRouter);


app.listen(PORT,()=>{
    console.log(`Mongodb listening on port ${PORT}`);
});
