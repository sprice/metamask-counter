import React, { Component } from 'react'

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

  logout() {
    this.props.logout()
  }

  incrementCount() {
    this.props.increment()
  }

  showCount() {
    this.setState({ showCount: true })
  }

  render() {
    return (
      <div>
        <h1>Logged In</h1>
        <h2>{this.props.auth.address}</h2>
        <p>
          <a onClick={this.logout}>Logout</a>
        </p>
        <p>
          <a onClick={this.incrementCount}>UPDATE</a>
        </p>
        <p>
          <a onClick={this.showCount}>READ</a>
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
