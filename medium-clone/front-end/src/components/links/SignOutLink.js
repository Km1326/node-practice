import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class SignOutLink extends Component {
  render() {
    const name = this.props.user.name;
    console.log(name)
    var sName = '';
    const spliltedName = name.split(' ').forEach(element => {
      sName += element[0]
    });
    console.log(spliltedName, "spited name")

    return (
      <nav className='right'>
        <span className='link-btn userName-logo'> { sName } </span>
        <Link to='/create' className='btn link-btn'> New Post </Link>
        <a href='/logout' className='btn link-btn'> Logout </a>
      </nav>
    )
  }
}

function mapStatettoProps(state) {
  return {
    user : state.fetchedUserData.user
  }
}

export default connect(mapStatettoProps)(SignOutLink) ;