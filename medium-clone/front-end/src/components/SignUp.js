import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpAction } from '../actions/actions';

class SignUp extends Component {

	state = {
    name : '',
		username : '',
		email : '',
		password : ''
	}
	
	handleClick = () => {
		this.props.signup(this.state)
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	render() {
		return (
			<div>
				<div className="signup left">
				<p className="header">Sign up</p>
        <input type="text" name="name" 
          className='input'
					placeholder="Name"
					onChange={this.handleChange}
					value={this.state.name}
				/>
				<input type="email" name="email" 
          placeholder="Email"
          className='input'
					onChange={this.handleChange}
					value={this.state.email}
				/>
				<input type="text" name="username" 
          placeholder="Username"
          className='input'
					onChange={this.handleChange}
					value={this.state.username}
				/>
				<input type="password" name="password" 
          placeholder="Password"
          className='input'
					onChange={this.handleChange}
					value={this.state.password}
				/>
				<button className="btn" onClick={this.handleClick}>Sign up</button>
				<p>Have an account  <Link to="/">go to login </Link></p>
				</div>

				<div className='right poster'></div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		signup: (newUser) => dispatch(signUpAction(newUser))
	}
}

export default connect(null, mapDispatchToProps)(SignUp);