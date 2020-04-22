import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home'
import Signup from './Components/Signup'
import User from './Components/User'
import Bar from './Components/Bar'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path= "/user" component={User} />
        <Route exact path="/bar" component={Bar} />
      </Router>
    </div>
  );
}

export default App;
