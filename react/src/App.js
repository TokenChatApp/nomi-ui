import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';

import Login from './pages/Login';
import Landing from './pages/Landing';
import Signup from './pages/Signup';

import Man from './pages/Man';
import Woman from './pages/Woman';

// get pages from pages directory
const ErrorPage = () => (<div>Error 404</div>);

const styles = {
  borderLeft : '1px solid #e4e4e4',
  borderRight: '1px solid #e4e4e4',
  width: '100%',
  maxWidth: 450,
  minHeight: '100vh',
  margin: 'auto',
};

class App extends Component {
  render() {
    return (
      <div className="App" style={{ minHeight: '100vh'}}>
        <div style={styles}>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={Signup}/>
              <Route path="/m" component={Man}/>
              <Route path="/w" component={Woman}/>
              <Route component={ErrorPage}/>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
