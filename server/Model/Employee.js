const mongoose = require('mongoose');

// List of columns for Employee schema
const Employee = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
}, {
  collection: 'employees',
});

module.exports = mongoose.model('Employee', Employee);
