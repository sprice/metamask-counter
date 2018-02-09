import React, { Component } from 'react'
import sigUtil from 'eth-sig-util'
import getWeb3 from '../utils/getWeb3'

class Login extends Component {
  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
    this.signMsg = this.signMsg.bind(this)

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
      })
      .catch(err => {
        console.log('Error finding web3.')
      })
  }

  // @COMMENT: https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290
  signMsg(msgParams, address) {
    address = address.toLowerCase()
    this.state.web3.currentProvider.sendAsync(
      {
        method: 'eth_signTypedData',
        params: [msgParams, address],
        from: address
      },
      (err, result) => {
        if (err) return console.error(err)
        if (result.error) {
          return console.error(result.error.message)
        }

        const sig = result.result

        const recovered = sigUtil.recoverTypedSignature({
          data: msgParams,
          sig
        })

        if (recovered === address) {
          this.props.login({ sig, address })
        } else {
          console.log('Failed to verify signer, got: ' + result)
        }
      }
    )
  }

  login() {
    const msgParams = [
      {
        type: 'string',
        name: 'Sign In',
        value: 'Sign in to codexprotocol.com'
      }
    ]

    this.state.web3.eth.getAccounts((error, accounts) => {
      this.signMsg(msgParams, accounts[0])
    })
  }

  render() {
    return (
      <div>
        <a onClick={this.login}>Login</a>
      </div>
    )
  }
}

export default Login