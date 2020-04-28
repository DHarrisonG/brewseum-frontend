import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Components/Nav'
import Home from './Components/Home'
import Signup from './Components/auth/Signup'
import User from './Components/User'
import Bar from './Components/Bar'


class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)

  }

  handleSuccessfulAuth(data){
    this.props.history.push("/")
}

  render() {
    return (
      <div className="App">
        <Nav loggedInStatus={this.state.loggedInStatus} />
        <Router>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home {...props} loggedInStatus={this.state.loggedInStatus} />
              )} />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />
              )} />
            <Route exact path="/user/:id" component={User} />
            <Route exact path="/bar" component={Bar} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
