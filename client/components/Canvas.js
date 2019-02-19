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


  draw = (coordX, coordY) => {
    let mouseX = coordX
    let mouseY = coordY
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
    const[touchX, touchY] = this.getTouchPos(event)
    this.draw(touchX, touchY)
    event.preventDefault()
  }

  getTouchPos = (event) => {
    event.preventDefault()
    let touchX, touchY
    if(event.touches){
      if (event.touches.length === 1){
        let touch = event.touches[0]
        //  touchX = touch.pageX-touch.target.offsetLeft
        touchX = touch.pageX
        touchY = touch.pageY
        console.log('FROM TOUCH', touch)
      }
    }
    return [touchX, touchY]
  }

  handleTouchMove = (event) => {
    const[touchX, touchY] = this.getTouchPos(event)
    this.draw(touchX, touchY)
    event.preventDefault()
  }

  handleMouseDown = (event) => {
    this.setState({
      isDown: true,
    })
    this.draw(event)
  }

  handleMouseMove = (event) => {
    if(this.state.isDown){
    let nativeEvent = event.nativeEvent  
    this.draw(event, nativeEvent.offsetX, nativeEvent.offsetY)
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