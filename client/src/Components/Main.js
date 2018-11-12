import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// Import all component files
import ListEmployee from './ListEmployee';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ListEmployee} />
          <Route path="/list" component={ListEmployee} />
          <Route path="/addemployee" component={AddEmployee} />
          <Route path="/editemployee/:id" component={EditEmployee} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
