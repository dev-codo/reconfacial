import React, { Component } from 'react';
import Particles from 'react-particles-js'; //background interactive
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

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

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id:'',
		name:'',
		email:'',
		entries:0,
		joined: new Date()
	}
}

class App extends Component {
	constructor() {
		super();
	    this.state = initialState;
	}

	loadUser = (dado) => {
		this.setState({
			user: {
				id: dado.id,
				name: dado.name,
				email: dado.email,
				entries: dado.entries,
				joined: dado.joined
			}
		})
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

	onPictureSubmit = () => {
		this.setState({imageUrl: this.state.input});
			fetch('http://localhost:2000/imageurl', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					input: this.state.input
				})
			})
			.then(response => response.json())
			.then(response => {
				if(response) {
					fetch('http://localhost:2000/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({ //convert obj to JSON to the Back-end
							id: this.state.user.id
						})
					})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, { entries: count }))
					})
					.catch(console.log);
				}
				this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(err));
	}

	onRouteChange = (rota) => {
		if(rota === 'signout') {
			this.setState(initialState)
		} else if (rota === 'home') {
			this.setState({isSignedIn: true})
		}
	  	this.setState({route: rota});
	}

	render() {
	    return (
	    	<div className="App">
	        	<Particles className='particles' params={particlesOptions} />
	        	<Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
	        	{ this.state.route === 'home' // ternary operator (if-else)
	        		? 	<div>
				        	<Logo />
				        	<Rank name={this.state.user.name} entries={this.state.user.entries}/>
				        	<ImageLinkForm 
				            	naMudancaInput={this.onInputChange} 
				            	noBotaoSubmeter={this.onPictureSubmit}/>
				          	<FaceRecognition boxxx={this.state.box} imagemSite={ this.state.imageUrl }/>
	        		 	</div>
	        		: 	(
							this.state.route === 'signin' || this.state.route === 'signout'
								? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
								: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
	        			)
	        	}
	      </div>
	    );
	}
}

export default App;
