import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

import '../index.css';

const divStyle = {
  margin: '8% 8%',
};

class ListEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      alert: null,
    };
  }

  componentDidMount = () => {
    this.getEmployeeList();
  };

  // To get all the employees
  getEmployeeList() {
    axios
      .get('http://localhost:5000/employees')
      .then(response => {
        console.log(response);
        this.setState({
          employees: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // delete employee
  confirmDelete = id => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={() => this.deleteEmployee(id)}
        onCancel={this.hideAlert}
      >
        You will not be able to recover this record!
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  };

  hideAlert = () => {
    console.log('Hiding alert...');
    this.setState({
      alert: false,
    });
  };

  deleteEmployee = id => {
    axios
      .get(`http://localhost:5000/employees/deleteEmployee/${id}`)
      .then(() => {
        console.log('Employee Deleted !!!');
        this.setState({ alert: null });
        this.getEmployeeList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { employees } = this.state;
    return (
      <div style={divStyle}>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee, i) => (
                <tr key={employee._id}>
                  <td>{i}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <Link
                      to={`editemployee/${employee._id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => this.confirmDelete(employee._id)}
                      bsStyle="danger"
                    >
                      Delete
                    </Button>
                    {this.state.alert}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ListEmployee;
