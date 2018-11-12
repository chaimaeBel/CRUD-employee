// Importing packages
const express = require('express');

// Using express and routes
const employeeRoute = express();

// Import Employee module 
const employee_Model = require('../Model/Employee');

// List Of Employees
employeeRoute.get('/', (req, res) => {
  employee_Model.find((err, employee) => {
    if (err) {
      console.log(err);
    } else {
      res.json(employee);
    }
  });
});

// To Add New Employee
employeeRoute.post('/addEmployee',(req, res) => {
  const {body} = req;
  const{
    firstName,
    lastName,
    phone
} = body;
  let {
    email
  } = body;
   
  if(!firstName){
    return  res.send({
      succes:false,
      message: 'Error:FirstName cannot be blank.'
  });
  }
  if(!lastName){
    return  res.send({
      succes:false,
      message: 'Error:lastName cannot be blank.'
  });
  }
  if(!phone){
    return  res.send({
      succes:false,
      message: 'Error: phone cannot be blank.'
  });
  }
  if(!email){
    return  res.send({
      succes:false,
      message: 'Error:mail cannot be blank.'
  });
  }
  const employee = new employee_Model();
  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.phone = phone;
  employee.email = email;

  employee.save()
    .then((msg) => {
      res.status(200).json({ employee: 'Employee Added Successfully' });
    })
    .catch((err) => {
      res.status(400).send('Something Went Wrong');
    });
});


// To Get Employee Details By Employee ID
employeeRoute.get('/editEmployee/:id', (req, res) => {
  const id = req.params.id;
  employee_Model.findById(id, (err, employee) => {
    if(err){
      res.json(err);
    }
    res.json(employee);
  });
});

// To Update The Employee Details
employeeRoute.post('/updateEmployee/:id',function (req, res) {
  employee_Model.findById(req.params.id, (err, employee) => {
    if (!employee) { 
      return new Error('Unable To Find Employee With This Id');
     }

    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.email = req.body.email;
    employee.phone = req.body.phone;

    employee.save().then((msg) => {
      res.json('Employee Updated Successfully');
    })
      .catch((err) => {
        res.status(400).send('Unable To Update Employee');
      });
  });
});

// To Delete The Employee
employeeRoute.get('/deleteEmployee/:id', (req, res) => {
  employee_Model.findByIdAndRemove({ _id: req.params.id }, (err, employee) => {
    if (err) 
      res.json(err);
    else 
      res.json('Employee Deleted Successfully');
  });
});

module.exports = employeeRoute;
