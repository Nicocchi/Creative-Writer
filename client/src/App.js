import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./pages/dashboard/Dashboard";
import Editor from "./pages/editor/editor";

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar history={this.props.history} />
          <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/editor' component={Editor} />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
