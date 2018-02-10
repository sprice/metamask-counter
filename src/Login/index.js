import React, { Component } from 'react'
import sigUtil from 'eth-sig-util'

class Login extends Component {
  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
    this.signMsg = this.signMsg.bind(this)

    this.state = {
      web3: this.props.web3
    }
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
        value: 'Sign in to count.shawnprice.com'
      }
    ]

    this.state.web3.eth.getAccounts((error, accounts) => {
      this.signMsg(msgParams, accounts[0])
    })
  }

  render() {
    return (
      <div>
        <button className="pure-button" onClick={this.login}>
          Login
        </button>
      </div>
    )
  }
}

export default Login
