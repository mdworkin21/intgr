import React, {Component} from 'react'
import '../public/styles/canvas.css'

class Canvas extends Component {
  constructor(){
    super()
    this.canvas = React.createRef()
    this.state = {
      isDown: false,
    }
  }


  draw = (event) => {
    let nativeEvent = event.nativeEvent
    console.log(nativeEvent.sourceCapabilities.firesTouchEvents)
    // if (nativeEvent.sourceCapabilities.firesTouchEvents){

    // }
    let mouseX = nativeEvent.offsetX
    let mouseY = nativeEvent.offsetY
    let canvas = this.canvas.current
    if (canvas.getContext){
      let context = canvas.getContext('2d')
      context.moveTo(mouseX, mouseY)
      context.lineTo(mouseX+1,mouseY+1);
      context.stroke();
      context.arc(mouseX, mouseY, 10, 0, Math.PI*2, true);
    }
  }

  handleTouchStart = (event) => {
    event.preventDefault()
    this.getTouchPos(event)
    this.draw(event)
    console.log('START')
  }

  getTouchPos = (event) => {
    console.log('TOUCH',event, e)
    if (!e){
      let e = event
    }

    if(e.touches){
      if (e.touches.length === 1){
        let touch = e.touches[0]
        touchX = touch.pageX-touch.target.offsetLeft
        touchY = touch.pageY-touch.target.offsetTop

      }
    }
    
  }

  handleTouchMove = (event) => {
    event.preventDefault()
    this.getTouchPos(event)
    this.draw(event)
    console.log('MOVE')
  }

  handleMouseDown = (event) => {
    this.setState({
      isDown: true,
    })
    this.draw(event)
  }

  handleMouseMove = (event) => {
    if(this.state.isDown){
      this.draw(event)
    }
  }


  handleMouseUp = () => {
    this.setState({
      isDown: false
    })
  }

  clearCanvas = () => {
    let canvas = this.canvas.current
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
  }
  

  render(){
  return (
    <React.Fragment> 
      <div id="canvas-container">
        <h1>Draw a Number: 0 - 9</h1>
        <canvas 
          id="canvas" 
          ref={this.canvas} 
          width="400" 
          height="600" 
          onMouseDown={this.handleMouseDown} 
          onMouseMove={this.handleMouseMove} 
          onMouseUp={this.handleMouseUp}
          onTouchStart ={this.handleTouchStart}
          onTouchMove = {this.handleTouchMove}
          > 
        </canvas>
      </div>
      <button id="clear-button" className="ui button" onClick={this.clearCanvas}>Clear</button>
      </React.Fragment>
    )
  }  
}

export default Canvas