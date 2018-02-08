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

export const increment = index => {
  return {
    type: 'INCREMENT',
    index
  }
}
