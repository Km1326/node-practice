import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/actions';
import { Link } from 'react-router-dom';

class Login extends Component {

  state = {
    username : '',
    password : ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    console.log('in login component')
    e.preventDefault();
    this.props.login(this.state) 
  }

	render() {
		return (
			<div>
				<div className='left poster'>
					
				</div>
				<div className="login right">
					<p className="header capital">log in to your account</p>
          <form>
            <input type="text" name="username" 
              placeholder="username" 
              className='input'
              onChange={this.handleChange} 
              value={this.state.username} 
            />
            <input type="password" name="password" 
              placeholder="password"
              className='input' 
              onChange={this.handleChange}
              value={this.state.password} 
            />
            <p>
              <button
                onClick={this.handleSubmit} 
                className='btn' 
              > Login </button>
            </p>
          </form>
					<br/><br/>
					<p>Don't have an account ?  <Link to="/signup"> Signup </Link></p>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
  return {
    login : (data) => dispatch(loginAction(data))
  }
}

export default connect(null, mapDispatchToProps)(Login)