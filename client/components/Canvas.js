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
    let mouseX = nativeEvent.offsetX
    let mouseY = nativeEvent.offsetY
    let canvas = this.canvas.current
    if (canvas.getContext){
      let context = canvas.getContext('2d')
      context.strokeStyle = 'blue'
      context.moveTo(mouseX, mouseY)
      context.lineTo(mouseX+1,mouseY+1);
      context.stroke();
      context.closePath();
    }
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
  

  render(){
  return (
    <div id="canvas-container">
      <h1>HELLO</h1>
      <canvas 
        id="canvas" 
        ref={this.canvas} 
        width="400" 
        height="600" 
        onMouseDown={this.handleMouseDown} 
        onMouseMove={this.handleMouseMove} 
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onTouchEnd = {this.handleMouseUp}
        >
        
      </canvas>
    </div>
    
    )
  }  
}

export default Canvas