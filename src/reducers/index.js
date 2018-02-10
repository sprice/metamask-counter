import { combineReducers } from 'redux'
import count from './count'
import auth from './auth'

const rootReducer = combineReducers({ count, auth })

export default rootReducer
