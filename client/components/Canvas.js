import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime"
import axios from 'axios'
import LabelModal from './LabelModal'
import '../public/styles/canvas.css'


class Canvas extends Component {
  constructor(){
    super()
    this.canvas = React.createRef()
    this.state = {
      isDown: false,
      width: 0,
      height: 0,
      image: '',
      label: '',
      modalOn: ''
    }

    //This line is to stop unwanted scroll behavior on touch.
    document.addEventListener('touchmove', function (event){event.preventDefault()}, {passive: false})

  }

  //Mouse and Touch use these
  draw = (coordX, coordY) => {
    let mouseX = coordX
    let mouseY = coordY
    let canvas = this.canvas.current
    //Checks to make sure context identifier is supported
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

  submitCanvas = async (event) => {
    event.preventDefault()
    //Turn canvas into string so it can be saved &/|| processed
    let dataUrl = this.canvas.current.toDataURL()
    //Converts dataUrl into an array, so we can process it. This might not be type of array we want, just playing around for now.
    // let length = dataUrl.length
    // let bytes = new Uint8Array(length)
    // let arrBuff = new ArrayBuffer(length)
    // for (let i = 0; i < length; i++){
    //   //Probabvly don't want charCode, just doing this to test
    //   bytes[i] = dataUrl.charCodeAt(i)
    // }

  
    this.setState({
      image: dataUrl
    })
    try{
      //Just a dummy route for now, returns random number
      let newDrawing = await axios.post('/api/analyze/runAnalysis', {
        image: dataUrl
      })
      
      // Use this to trigger the modal once modal is ready
      if (newDrawing.status === 200){
        this.clearCanvas()
        this.setState({
          image: '',
          modalOn: 'active',
          label: newDrawing.data
        })

        //Placeholder for now
        alert('Result: ' + this.state.label)

      }
    } catch(err) {
        console.log(err)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  //Touch Methods
  handleTouchStart = (event) => {   
    const [touchX, touchY] = this.getTouchPos(event)
    this.draw(touchX, touchY)
  }

  getTouchPos = (event) => {
    let touchX, touchY
    if(event.touches){
      //Checks to make sure only 1 finger
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
        <button id="submit-button" className="ui button" onClick={this.submitCanvas}>Submit</button>
        </React.Fragment>
    )
  }  
}

export default Canvas