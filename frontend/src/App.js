import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import {Route, Switch} from "react-router-dom";
import Login from "./Components/Login/Login";
import NewIngredient from "./Components/NewIngredient/NewIngredient";
import Ingredients from "./Components/Ingredients/Ingredients";
import MyIngredients from "./Components/MyIngredients/MyIngredients";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <Switch>
              <Route path="/" exact component={Ingredients}/>
              <Route path="/login" component={Login}/>
              <Route path="/new/ingredient" component={NewIngredient}/>
              <Route path="/my/ingredients" component={MyIngredients}/>
          </Switch>
        </div>
    )
  }
}

export default App;