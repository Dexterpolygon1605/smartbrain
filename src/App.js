import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'c65f7faee63a448094f2877f83286f17'
});

const particlesOptions = {
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 800
      }
    }
    }
  }


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
  this.setState({imageUrl: this.state.input})
  app.models.predict(Clarifai.FACE_DETECT_MODEL,
   this.state.input).then(
    function(response){
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err){

    }
  )
}

  render(){
  return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}
            />
                
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
     <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  )};
}

export default App;
