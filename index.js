const express = require('express')
require('dotenv').config()
const connectDB = require('./db')
var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

connectDB();

app.use(express.json({ extended: false }))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(bodyParser.json());

app.use(express.static('views'))
//routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`))


