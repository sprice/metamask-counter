import React, { Component } from 'react'
import Loader from 'react-loader'
import getWeb3 from '../utils/getWeb3'
import Login from '../Login'
import Logout from '../Logout'
import './AccountDetails.css'

class AccountDetails extends Component {
  constructor(props) {
    super(props)

    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.metamaskConnected = this.metamaskConnected.bind(this)
    this.loadPage = this.loadPage.bind(this)

    this.state = {
      web3: null,
      address: null,
      loaded: false
    }
  }

  componentWillMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })
        this.checkAccount()
        this.loadPage()
      })
      .catch(err => {
        console.log('Error finding web3.')
      })
  }

  checkAccount() {
    // Poll for Metamask connection chnage/address change.
    setInterval(() => {
      this.state.web3.eth.getAccounts((error, accounts) => {
        const userAddress = accounts[0]
        if (userAddress) {
          const normalizedAddress = userAddress.toLowerCase()
          const { address } = this.props.auth
          // Check saved address with connected Metamask address
          if (normalizedAddress !== address) {
            this.props.logout()
          }
          this.setState({ address: normalizedAddress })
        } else {
          this.setState({ address: null })
        }
      })
    }, 500)
  }

  metamaskConnected() {
    if (this.state.address) return true
    else return false
  }

  // Hacky page load spinner to not flash "Install metamask"
  loadPage() {
    setTimeout(() => {
      this.setState({ loaded: true })
    }, 750)
  }

  isLoggedIn() {
    if (this.props.auth && this.props.auth.sig && this.props.auth.address) return true
    else return false
  }

  render() {
    return (
      <div className="account-details">
        <Loader loaded={this.state.loaded}>
          {this.metamaskConnected() ? (
            this.isLoggedIn() ? (
              <Logout {...this.props} />
            ) : (
              <Login {...this.props} web3={this.state.web3} />
            )
          ) : (
            <span>
              Please install and connect to <a href="https://metamask.io/">Metamask</a> browser extension
            </span>
          )}
        </Loader>
      </div>
    )
  }
}

export default AccountDetails
