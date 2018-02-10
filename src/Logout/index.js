import React, { Component } from 'react'
import { apiServer } from '../constants'

class Logout extends Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
    this.incrementCount = this.incrementCount.bind(this)
    this.showCount = this.showCount.bind(this)

    this.state = {
      showCount: false
    }
  }

  componentDidMount() {
    const { sig, address } = this.props.auth
    this.props.loginToServer(apiServer, { sig, address }).then(() => {
      const { sig, address } = this.props.auth
      this.props.getCount(apiServer, { sig, address })
    })
  }

  logout() {
    this.props.logout()
  }

  incrementCount() {
    const { sig, address } = this.props.auth
    this.props.increment(apiServer, { sig, address })
  }

  showCount() {
    this.setState({ showCount: true })
    const { sig, address } = this.props.auth
    this.props.getCount(apiServer, { sig, address })
  }

  render() {
    return (
      <div>
        <h1>Logged In</h1>
        <h2>{this.props.auth.address}</h2>
        <p>
          <button className="pure-button" onClick={this.logout}>
            Logout
          </button>
        </p>
        <p>
          <button className="pure-button" onClick={this.incrementCount}>
            UPDATE
          </button>
        </p>
        <p>
          <button className="pure-button" onClick={this.showCount}>
            READ
          </button>
        </p>
        {this.state.showCount && (
          <p>
            <span>The count is {this.props.count}</span>
          </p>
        )}
      </div>
    )
  }
}

export default Logout
