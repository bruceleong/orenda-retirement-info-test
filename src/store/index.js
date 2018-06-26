import {createStore, combineReducers, applyMiddleware} from 'redux'
// import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import company from './company'


const reducer = combineReducers({company})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware
))
const store = createStore(reducer, middleware)

export default store
export * from './company'

// createLogger({collapsed: true})
