import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction, getLoggedinUserData } from '../actions/actions';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';

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
    e.preventDefault();
    this.props.login(this.state) 
  }

  componentDidMount() {
    fetch('http://localhost:7000/isLoggedin')
    .then(res => res.json())
    .then(data => {
      console.log(data,'data in action');
      this.props.getData(data);
    }) 
  }

	render() {
    if(this.props.currentUser) return <Redirect to='/create' /> 
		return (
			<div className='App'>
				<div className='left poster'>
					
				</div>
        <Header />
				<div className="login right">
					<p className="header-title capital">log in to your account</p>
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
    login : (data) => dispatch(loginAction(data)),
    getData : (data) => dispatch(getLoggedinUserData(data))
  }
}

function mapStateToProps(state) {
  if(state) {
    return {
      currentUser: state.loggedInUser
    }
  } else {
    return {
      currentUser : state
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)