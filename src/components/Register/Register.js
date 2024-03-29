import React from 'react';

class Register extends React.Component {
	constructor(props) { //create this state
		super(props);
		this.state = {
			registerEmail: '',
			registerPassword:'',
			registerName:''
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}	

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value})
	}
	
	//send POST to the Server
	onSubmitSignIn = (e) => {
		e.preventDefault(); //primeiro comentario
		fetch('http://localhost:2000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ //convert obj to JSON to the Back-end
				email: this.state.registerEmail,
				password: this.state.registerPassword,
				name: this.state.registerName
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home'); 
			//this.props: used in 'App.js' component. 
			}
		})
	}

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <form className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name-address">Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="name" 
				        	id="name" 
				        	onChange={this.onNameChange}/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address" 
				        	id="email-address" 
				        	onChange={this.onEmailChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password" 
				        	id="password" 
				        	onChange={this.onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="">
				      	<input 
				      		onClick={this.onSubmitSignIn}
				      		className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      		type="submit" 
				      		value="Register" 
			      		/>
				    </div>
				  </form>
				</main>
			</article>
		);
		
	}
};
//form copiado no 'tachyons form - google'

export default Register;