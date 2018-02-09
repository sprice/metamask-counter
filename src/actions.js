export const login = auth => {
  const { sig, address } = auth
  window.localStorage.sig = sig
  window.localStorage.address = address

  return {
    type: 'LOGIN',
    auth
  }
}

export const logout = auth => {
  window.localStorage.removeItem('sig')
  window.localStorage.removeItem('address')
  return {
    type: 'LOGOUT',
    auth
  }
}

export const recordLogin = hasLoggedInBefore => {
  window.localStorage.hasLoggedInBefore = hasLoggedInBefore
  return {
    type: 'RECORD_LOGIN',
    hasLoggedInBefore
  }
}

const receiveIncrementCount = json => {
  return {
    type: 'INCREMENT_COUNT',
    count: json.count
  }
}

const incrementPut = (sig, address) => {
  return dispatch => {
    const options = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    return fetch(`http://localhost:5000/user/${address}/count?sig=${sig}&address=${address}`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveIncrementCount(json)))
  }
}

export const increment = (sig, address) => {
  return (dispatch, getState) => {
    return dispatch(incrementPut(sig, address))
  }
}

const requestCount = () => {
  return {
    type: 'REQUEST_COUNT'
  }
}

const receiveCount = json => {
  return {
    type: 'RECEIVE_COUNT',
    count: json.count
  }
}

const fetchCount = (sig, address) => {
  return dispatch => {
    dispatch(requestCount())
    return fetch(`http://localhost:5000/user/${address}/count?sig=${sig}&address=${address}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCount(json)))
  }
}

export const getCount = (sig, address) => {
  return (dispatch, getState) => {
    return dispatch(fetchCount(sig, address))
  }
}

const receiveLoginStatus = json => {
  return {
    type: 'RECEIVE_LOGIN_STATUS',
    count: json.status
  }
}

const serverLoginPost = data => {
  return dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    return fetch(`http://localhost:5000/login`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveLoginStatus(json)))
  }
}

export const loginToServer = data => {
  return (dispatch, getState) => {
    return dispatch(serverLoginPost(data))
  }
}
