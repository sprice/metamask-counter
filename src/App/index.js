import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import AccountDetails from '../AccountDetails'
import './App.css'
import 'purecss/build/base.css'
import 'purecss/build/buttons.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null
    }
  }

  componentWillMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })
        this.checkAccount()
      })
      .catch(err => {
        console.log('Error finding web3.')
      })
  }

  checkAccount() {
    this.state.web3.eth.getAccounts((error, accounts) => {
      const userAddress = accounts[0]
      const { address } = this.props.auth
      // Check saved address with Metamask address
      if (userAddress !== address) {
        this.props.logout()
      }
    })
  }

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
