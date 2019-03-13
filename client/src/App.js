import React, { Component } from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./pages/dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
