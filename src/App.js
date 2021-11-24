import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Audio from './components/Audio/Audio';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

const particlesOptions = { particles: { move: { speed: 0.5 }, number: { value: 50 } } };

const credentials = {
  id: '',
  name: '',
  username: '',
  email: '',
  entries: 0,
  joined: ''
};

const initialState = {
  input: '',
  url: '',
  boxArr: [],
  route: 'signin',
  detecting: false,
  user: credentials
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    window.location.hash = this.state.route;
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onNavigationChange)
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onNavigationChange = () => {
    if (window.location.hash === '#home') {
      window.location.hash = this.state.route
    } else if (window.location.hash === '#signin') {
      document.querySelector('body').style.background = 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)';
      this.setState(initialState)
    }
    this.setState({ route: window.location.hash.substring(1) })
  }

  playSound = () => {
    try {
      setTimeout(() => {
        document.getElementById("audio").play();
        document.getElementById("play").classList.toggle("dn");
        document.getElementById("pause").classList.toggle("dn");
        }, 1)
    } catch {
      this.playSound()
    }
  }

  calculateFaceLocation = (data) => {
    const boxValues = [];
    const clarifaiFace = data.outputs[0].data.regions;
    for (let i in clarifaiFace) {
      boxValues.push(clarifaiFace[i].region_info.bounding_box);
      for (let key in boxValues[i]) {
        boxValues[i][key] *= 100
      }
    }
    return boxValues
  }

  updateBoxArr = (boxArr) => {
    this.setState({ boxArr })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onPictureSubmit = () => {
    const { floor, random } = Math;
    const body = document.querySelector('body');
    const input = this.state.input.replace(/\s/g, '');
    const red = floor(random() * 256);
    const green = floor(random() * 256);
    const blue = floor(random() * 256);
    this.setState({ url: input });
    if (input !== '') {
      this.setState({ detecting: true });
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.setState({ detecting: false }, window.scrollTo(0, 400));
        body.style.background = `rgb(${ red }, ${ green }, ${ blue })`;
        this.updateBoxArr(this.calculateFaceLocation(response));
        // fetch('http://localhost:3001/image', {
        //     method: 'PUT',
        //     headers: {'content-type': 'application/json'},
        //     body: JSON.stringify({
        //             id: this.state.user.id,
        //     })
        // })
        //     .then(response => response.json())
        //     .then(count => {
        //       if (typeof(count) === 'number') {
        //         this.setState(Object.assign(this.state.user, {entries: count}))
        //       }
        //     })
        }
      )
      .catch(err => {
        const errCode = err.message.substring(32);
        body.style.background = 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)';
        if (errCode[0] === '4') {
          this.setState({ detecting: 400 });
        } else {
          this.setState({ detecting: 'no-service' });
        }
      })
    } else {
      this.setState({ detecting: false });
      body.style.background = 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)'
    }
  }

  onRouteChange = (route) => {
    this.setState({ route });
    window.location.hash = route;
    if (route === 'home') {
      this.playSound()
    }
  }

  render() {
    const { url, boxArr, route, detecting, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={ particlesOptions } />
        { route === 'home'
          ? <div>
              <Navigation routeChange = { this.onRouteChange } />
              <div className="middle inline">
                <Logo />
                <Rank name={ user.name } entries={ user.entries } />
              </div>
              <Audio />
              <ImageLinkForm inputChange = { this.onInputChange } buttonSubmit = { this.onPictureSubmit } />
              <FaceRecognition boxArray = { boxArr } imageUrl = { url } request = { detecting } />
            </div>
          : ( route === 'signin'
              ? <SignIn routeChange = { this.onRouteChange } loadUser={ this.loadUser } />
              : route === 'register'
              ? <Register routeChange = { this.onRouteChange } loadUser={ this.loadUser } />
              : <h1>404: Page Not Found.</h1>
            )
        }
      </div>
    )
  }
}

export default App;