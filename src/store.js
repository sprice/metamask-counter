import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/index'

const defaultState = {
  auth: {
    hash: window.localStorage.hash,
    sig: window.localStorage.sig,
    address: window.localStorage.address
  },
  count: 0
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
