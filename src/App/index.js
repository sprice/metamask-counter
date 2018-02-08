import React, { Component } from 'react'
import AccountDetails from '../AccountDetails'
import logo from './logo.svg'
import './App.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <AccountDetails {...this.props} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    count: state.count
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
