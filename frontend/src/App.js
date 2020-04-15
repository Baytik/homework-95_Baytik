import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import {Route, Switch} from "react-router-dom";
import Login from "./Components/Login/Login";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <Switch>
              <Route path="/login" component={Login}/>
          </Switch>
        </div>
    )
  }
}

export default App;