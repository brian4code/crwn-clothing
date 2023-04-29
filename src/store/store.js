import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// library to print log in console before / after state change
import logger from 'redux-logger'
import thunk from 'redux-thunk'

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

// redux-persist to keep state in local storage for later retrieve
const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user'],    // do not persist user state in local storage
  whitelist: ['cart'],    // only persist cart state 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk]

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)
