import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/index'

const defaultState = {
  auth: {
    sig: (window && window.localStorage && window.localStorage.sig) || undefined,
    address: (window && window.localStorage && window.localStorage.address) || undefined
  },
  count: 0
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || function() {}
const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
