import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import '../index.css';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="##">Employee CRUD Operations</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/addemployee">Add New Employee</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default Header;
