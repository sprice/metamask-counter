import React, { Component } from 'react'
import Login from '../Login'
import Logout from '../Logout'
import './AccountDetails.css'

class AccountDetails extends Component {
  constructor(props) {
    super(props)

    this.isLoggedIn = this.isLoggedIn.bind(this)
  }

  isLoggedIn() {
    if (this.props.auth && this.props.auth.sig && this.props.auth.address) return true
    else return false
  }

  render() {
    return (
      <div className="account-details">
        {this.isLoggedIn() ? <Logout {...this.props} /> : <Login {...this.props} />}
      </div>
    )
  }
}

export default AccountDetails
