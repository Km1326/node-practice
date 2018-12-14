import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/actions';

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

  render() {
    return (
      <div>
        <form>
        <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
        <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
        <input type="submit" value="submit" onClick={this.handleSubmit} />
      </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login : (data) => dispatch(loginAction(data))
  }
}

export default connect(null, mapDispatchToProps)(Login)