import { combineReducers } from 'redux'
import count from './count'
import auth from './auth'
import hasLoggedInBefore from './hasLoggedInBefore'

const rootReducer = combineReducers({ count, auth, hasLoggedInBefore })

export default rootReducer
