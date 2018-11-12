import React, { Component } from 'react';
import axios from 'axios';

    const formStyle = {
      width: '300px',
      margin: '0 auto',
    };

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      emailERR: '',
      firstnameERR:'',
      lastNameERR:'',
      phoneERR:''

    };
  }

  // When value changes of the fields
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //form validation
   validate = () => {
      let emailERR = "";
  
      if(!this.state.email.includes("@")){
         emailERR = 'invalid email';
      }
       if(emailERR){
         this.setState({emailERR});
         return false;
       }
       this.setState({emailERR:''})
       return true;
   }
  
  // To add new employee when user submits the form
  validateFirstName=(formfield,nameOfTheField)=>{
    
    if(formfield === ''){
      
      this.setState({firstnameERR:`you forgot to enter the field of ${nameOfTheField}`});
      return false;
    }
    else{
      
      this.setState({firstnameERR:''});
      return true;
    }
  }
  validateLastName=(formfield,nameOfTheField)=>{
    
    if(formfield === ''){
      
      this.setState({lastNameERR:`you forgot to enter the field of ${nameOfTheField}`});
      return false;
    }
    else{
     
      this.setState({lastNameERR:''})
      return true;
    }
  }
  validatePhone=(formfield,nameOfTheField)=>{
    
    if(formfield === ''){
      
      this.setState({phoneERR:`you forgot to enter the field of ${nameOfTheField}`});
      return false;
    }
    else{
     
      this.setState({phoneERR:''})
      return true;
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    const isvalidFirst=this.validateFirstName(this.state.firstName,'firstname');
    const isvalidLast=this.validateLastName(this.state.lastName,'lastname');
    const isvalidPhone=this.validatePhone(this.state.phone,'phone');

    if(isValid && isvalidFirst && isvalidLast && isvalidPhone ){
      
    const { firstName, lastName, email, phone } = this.state;
    axios
      .post('http://localhost:5000/employees/addEmployee', {
        firstName,
        lastName,
        email,
        phone,
      })
      .then(response => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  render() {
    return (
      <div className="container">
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <label>
            First Name
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
              className="form-control"
            />
          <div className="text-danger">{this.state.firstnameERR}</div>
          </label>
          <br />
          <label>
            Last Name
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
              className="form-control"
            />
            <div className="text-danger">{this.state.lastNameERR}</div>
          </label>
         
          <br />
          <label>
            Email
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
            />
            <div className="text-danger">{this.state.emailERR}</div>
          </label>
          <br />
          <label>
            Phone No
            <input
              name="phone"
              type="text"
              value={this.state.phone}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <div className="text-danger">{this.state.phoneERR}</div>
          <br />
          <input type="submit" value="submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default AddEmployee;
