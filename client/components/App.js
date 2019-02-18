import React from 'react'
import {Provider} from 'react-redux'
import store from '../redux/store'
import Canvas from './Canvas'

//When you add redux, you'll need to add 
const App = () => {
return (
  <Provider store={store}>
    <Canvas />
  </Provider>
  )
}

export default App