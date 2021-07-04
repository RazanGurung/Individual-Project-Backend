const express = require('express');
const bodyParser = require('body-parser');
const database = require("./database/database")
const path = require('path');
const public = path.join(__dirname,'')
const userrouter = require('./routes/user.js');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(public));


app.use(bodyParser.urlencoded({extended:false}));

app.use(userrouter);

app.listen(8000);