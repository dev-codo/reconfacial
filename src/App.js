import React, { Component } from 'react';
import Particles from 'react-particles-js'; //background interactive
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
	apiKey: 'a5b7e6142ead4be8be340389abe45e70'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}                

class App extends Component {
	constructor() {
		super();
	    this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin', //track where user is on the page
	    	isSignedIn: false
	    }
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
	    const image = document.getElementById('estaImagem');
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
		console.log(box);
	    this.setState({box: box});
	}
	  
	onInputChange = (event) => {
	    this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
	    this.setState({imageUrl: this.state.input});

	    app.models.predict( //method from Clarifai
		Clarifai.FACE_DETECT_MODEL, this.state.input)
	    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
	    .catch(err => console.log(err));
	}

	onRouteChange = (rota) => {
		if(rota === 'signout') {
			this.setState({isSignedIn: false})
		} else if (rota === 'home') {
			this.setState({isSignedIn: true})
		}
	  	this.setState({route: rota});
	}

	render() {
		// const { isSignedIn, imageUrl, route, box } = this.state; [destructured]
	    return (
	    	<div className="App">
	        	<Particles className='particles' params={particlesOptions} />
	        	<Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
	        	{ this.state.route === 'home' // ternary operator (if-else)
	        		? 	<div>
				        	<Logo />
				        	<Rank />
				        	<ImageLinkForm 
				            	naMudancaInput={this.onInputChange} 
				            	noBotaoSubmeter={this.onButtonSubmit}/>
				          	<FaceRecognition boxxx={this.state.box} imagemSite={ this.state.imageUrl }/>
	        		 	</div>
	        		: 	(
							this.state.route === 'signin' || this.state.route === 'signout'
								? <Signin onRouteChange={this.onRouteChange} />
								: <Register onRouteChange={this.onRouteChange} />
	        			)

	        		
	        	}
	      </div>
	    );
	}
}

export default App;
