import React, { Component } from 'react'
import Category from "./Category"
import Home from "./Home"
import Expenses from "./Expenses"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default class App extends Component {
  
  state={}

  render() {
    return (
      <div>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/categories" exact={true} component={Category}/>
          <Route path="/expenses" exact={true} component={Expenses}/>
        </Switch>
      </Router>
      </div>
    )
  }
}
