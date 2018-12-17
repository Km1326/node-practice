import React, { Component } from 'react';


class SignInLink extends Component {
  render() {
    return (
      <nav className='right'>
        <a href='/login' className='btn link-btn'> Login </a>
        <a href='/signup' className='btn link-btn'> Signup </a>
      </nav>
    )
  }
}

export default SignInLink ;