const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require("./database/database")
const env = require ("dotenv");
const path = require('path');
const public = path.join(__dirname,'')
const userrouter = require('./routes/user.js');
const adminrouter = require('./routes/admin.js');
const servicerouter = require('./routes/service.js');
const cors = require('cors');

env.config({
    path:"./.env"
})
connectDB();

const PORT = process.env.PORT || 8000
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(public));


app.use(bodyParser.urlencoded({extended:false}));

app.use(userrouter);
app.use(adminrouter);   
app.use(servicerouter);

app.listen(PORT);