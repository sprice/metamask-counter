import { createStore } from 'redux'

import rootReducer from './reducers/index'

const defaultState = {
  auth: {
    hash: window.localStorage.hash,
    sig: window.localStorage.sig,
    address: window.localStorage.address
  },
  count: 0
}

const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
// const store = createStore(rootReducer, defaultState)

export default store
