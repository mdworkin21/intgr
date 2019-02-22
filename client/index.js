import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

//This first line is to stop unwanted scroll behavior on touch 
document.addEventListener('touchmove', function (event){event.preventDefault()}, {passive: false})
ReactDOM.render( <App />, document.getElementById('root'))