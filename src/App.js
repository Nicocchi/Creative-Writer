import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import withRoot from "./withRoot";
import Dashboard from "./pages/dashboard/Dashboard";
import Editor from "./pages/editor/Editor";
import About from "./pages/about/About";

class App extends Component {
  render() {
    return (
      <div className="App">
          {/*<NavBar history={this.props.history} />*/}
          {/*<Header/>*/}
          {/*<Navigator/>*/}
          {/*<Content/>*/}
          <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/editor' component={Editor} />
              <Route exact path='/about' component={About} />
          </Switch>
      </div>
    );
  }
}

export default withRouter(withRoot(App));
