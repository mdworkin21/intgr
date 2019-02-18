import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'



//Redux Devtools 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//Combines Reducers
const rootReducer = combineReducers({
  replaceWhenYouHaveState: 'asdasdads'
})

//Creates Store
const store = createStore( rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, createLogger())))

export default store