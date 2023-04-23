import { compose, createStore, applyMiddleware } from 'redux'
// library to print log in console before / after state change
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

// root-reducer

// // currying - dynamic function creator 
// const curryFunc = (a) => (b, c) => {
//   a + b - c
// }
// const with3 = curryFunc(3)
// with3(2, 4) //  3 + 2 - 4

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action)
  }

  console.log('type: ', action.type)
  console.log('payload: ', action.payload)
  console.log('currentState: ', store.getState())

  next(action)    // this is synchronous, action hit reducers

  // reducer updates state, then new state is logged 
  console.log('next state: ', store.getState())
}


const middleWares = [logger]

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)
