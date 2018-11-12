// Imported required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// MongoDB Databse url
const mongoDatabase = 'mongodb://localhost:27017/employeeDetails';

// Created express server
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected'); },
  (err) => { console.log(`There is problem while connecting database ${err}`); },
);

// All the express routes
const employeeRoutes = require('../Routes/Employee_Route');

// Conver incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 5000;

// Routes Configuration
app.use('/employees', employeeRoutes);

// Staring our express server
app.listen(port, () => {
  console.log(`Server Lisening On Port : ${port}`);
});
