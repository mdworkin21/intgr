import React, {Component} from 'react'
import '../public/styles/canvas.css'



class Canvas extends Component {
  constructor(){
    super()
    this.canvas = React.createRef()
    this.state = {
      isDown: false,
      width: 0,
      height: 0
    }

    //This line is to stop unwanted scroll behavior on touch.
    document.addEventListener('touchmove', function (event){event.preventDefault()}, {passive: false})

  }

  //Mouse and Touch use these
  draw = (coordX, coordY) => {
    let mouseX = coordX
    let mouseY = coordY
    let canvas = this.canvas.current
    if (canvas.getContext){
      let context = canvas.getContext('2d')
      context.moveTo(mouseX, mouseY)
      context.lineTo(mouseX+1,mouseY+1);
      context.fill()
      context.arc(mouseX, mouseY, 6, 0, Math.PI*2, false);
    }
  }
  
  clearCanvas = () => {
    let canvas = this.canvas.current
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
  }

  saveCanvas = () => {
    let dataUrl = this.canvas.current.toDataURL()
    console.log(dataUrl instanceof Blob)
    return dataUrl
  }

  //Touch Methods
  handleTouchStart = (event) => {   
    const[touchX, touchY] = this.getTouchPos(event)
    this.draw(touchX, touchY)
  }

  getTouchPos = (event) => {
    let touchX, touchY
    if(event.touches){
      if (event.touches.length === 1){
        let rect = this.canvas.current.getBoundingClientRect()
        let touch = event.touches[0]
         touchX = touch.clientX - rect.left
         touchY = touch.clientY - rect.top + 30
      }
    }
    return [touchX, touchY]
  }

  handleTouchMove = (event) => {
    const[touchX, touchY] = this.getTouchPos(event)
    this.draw(touchX, touchY)
  }

  //Mouse Methods
  handleMouseDown = (event) => {
    this.setState({
      isDown: true,
    })
    let nativeEvent = event.nativeEvent  
    this.draw(nativeEvent.offsetX, nativeEvent.offsetY)
  }

  handleMouseMove = (event) => {
    if(this.state.isDown){
    let nativeEvent = event.nativeEvent  
    this.draw(nativeEvent.offsetX, nativeEvent.offsetY)
    }
    event.preventDefault()
  }

  handleMouseUp = () => {
    this.setState({
      isDown: false
    })
  }
  
  //Gets screen size so we can adjust size of canvas for devices
  componentDidMount(){
    //First is for mobile screens
    if (screen.width <= 375){
      this.setState({
        width: 250,
        height: 350
      })
    } else {
      this.setState({
        width: 400,
        height: 600
      })
    }
  }

  //Render
  render(){
    return (
      <React.Fragment> 
          <h1>Draw a Number: 0 - 9</h1>
        <div id="canvas-container">
          <canvas 
            id="canvas" 
            ref={this.canvas} 
            width={this.state.width}
            height={this.state.height} 
            onMouseDown={this.handleMouseDown} 
            onMouseMove={this.handleMouseMove} 
            onMouseUp={this.handleMouseUp}
            onTouchStart ={this.handleTouchStart}
            onTouchMove = { this.handleTouchMove}
            > 
          </canvas>
        </div>
        <button id="clear-button" className="ui button" onClick={this.clearCanvas}>Clear</button>
        <button id="save-button" className="ui button" onClick={this.saveCanvas}>Save</button>
        </React.Fragment>
    )
  }  
}

export default Canvas