import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Components/Nav'
import Home from './Components/Home'
import Signup from './Components/Signup'
import User from './Components/User'
import Bar from './Components/Bar'


class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false
    }
  }

  render(){
    return (
      <div className="App">
        <Nav loggedin={this.state.loggedIn}/>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path= "/user/:id" component={User} />
          <Route exact path="/bar" component={Bar} />
        </Router>
      </div>
    );  
  }
}

export default App;
