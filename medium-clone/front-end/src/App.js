import React, { Component } from 'react';
import './App.scss';
import Login from './components/Login';
import SignUP from './components/SignUp';
import CreatePost from './components/CreatePost';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/signup' component={SignUP} />
          <Route path='/create' component={CreatePost} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
