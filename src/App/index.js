import React, { Component } from 'react'
import AccountDetails from '../AccountDetails'
import './App.css'
import 'purecss/build/base.css'
import 'purecss/build/buttons.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

class App extends Component {
  render() {
    return (
      <div className="App">
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
    count: state.count,
    hasLoggedInBefore: state.hasLoggedInBefore
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
