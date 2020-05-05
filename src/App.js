import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Components/Nav'
import Home from './Components/Home'
import Signup from './Components/auth/Signup'
import User from './Components/User'
import Bar from './Components/Bar'
import Login from './Components/Login'


class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false,
      currentUserId: "",
      user: {},
      bars: []
    }

  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        loggedIn: true
      })
    }
    fetch('http://localhost:3000/bars')
    .then(r => r.json())
    .then(bars => {
      this.setState({
        bars: bars
      })
    })
  }

  handleLogin = (status, id) => {
    this.setState({
      loggedIn: status,
      currentUserId: id
    })
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.setState({
      loggedIn: false,
      currentUserId: ""
    })
  }



  render() {
    return (
      <div className="App">
        <Nav loggedIn={this.state.loggedIn} bars={this.state.bars} handleLogout={this.handleLogout}/>
        <Router>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home {...props} bars={this.state.bars} loggedIn={this.state.loggedIn} />
              )} />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup />
              )} />
            <Route 
            exact 
            path="/login" 
            render={props => (
              <Login {...props} handleLogin={this.handleLogin} />
            )} />
            <Route exact path="/user/:id" component={User} />
            <Route exact path="/bars/:id" component={Bar} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
