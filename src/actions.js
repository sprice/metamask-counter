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
  window.localStorage.clear()
  return {
    type: 'LOGOUT',
    auth
  }
}

export const increment = () => {
  return {
    type: 'INCREMENT_COUNT'
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

function fetchCount() {
  return dispatch => {
    dispatch(requestCount())
    return fetch(`http://localhost:5000/test`)
      .then(response => response.json())
      .then(json => dispatch(receiveCount(json)))
  }
}

export function getCount() {
  return (dispatch, getState) => {
    return dispatch(fetchCount())
  }
}
