import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpAction } from '../actions/actions'

class SignUp extends Component {

  state = {
    name : '',
    username : '',
    email : '',
    password : ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state)

  }

  render() {
    return (
      <div>
        <form>
          <input type="text" name='name' placeholder="name" onChange={this.handleChange} />
          <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
          <input type="email" name="email" placeholder="email" onChange={this.handleChange} />
          <input type="password" name="password"  placeholder="password" onChange={this.handleChange} />
          <input type="submit" value="submit" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp : (data) => dispatch(signUpAction(data))
  }
}

export default connect(null, mapDispatchToProps)(SignUp);