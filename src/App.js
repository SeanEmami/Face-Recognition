import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '7ab99224c94b4385920aeddc8047066d'
})

const particlesOptions = {
  particles: {
    polygon: {
      enable: true,
      type: 'inside',
      move: {
        radius: 10
      },
      url: 'path/to/svg.svg'
    }
  }
}



class App extends Component  {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route:'signin',
      isSignedIn: false

    }
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

  displayFaceBox = (box) => {
  
  this.setState({box: box});
}


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));

  }

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}



  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
        ? <div>
        <Logo />
        <ImageLinkForm onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} />
        
        <Rank />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        
        : (
          this.state.route ==='signin'
          ?  <Signin onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
        )
      }
    </div>
    );
  }
}

export default App;
