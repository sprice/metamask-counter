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

const receiveIncrementCount = json => {
  return {
    type: 'INCREMENT_COUNT',
    count: json.count
  }
}

const incrementPut = (apiServer, data) => {
  return dispatch => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    return fetch(`${apiServer}/user/${data.address}/count`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveIncrementCount(json)))
  }
}

export const increment = (apiServer, data) => {
  return (dispatch, getState) => {
    return dispatch(incrementPut(apiServer, data))
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

const fetchCount = (apiServer, data) => {
  return dispatch => {
    dispatch(requestCount())
    return fetch(`${apiServer}/user/${data.address}/count?sig=${data.sig}&address=${data.address}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCount(json)))
  }
}

export const getCount = (apiServer, data) => {
  return (dispatch, getState) => {
    return dispatch(fetchCount(apiServer, data))
  }
}

const receiveLoginStatus = json => {
  return {
    type: 'RECEIVE_LOGIN_STATUS',
    count: json.status
  }
}

const serverLoginPost = (apiServer, data) => {
  return dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    return fetch(`${apiServer}/login`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveLoginStatus(json)))
  }
}

export const loginToServer = (apiServer, data) => {
  return (dispatch, getState) => {
    return dispatch(serverLoginPost(apiServer, data))
  }
}
