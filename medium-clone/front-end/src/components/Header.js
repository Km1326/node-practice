import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignInLink from './links/SignInLink';
import SignOutLink from './links/SignOutLink';
import { getLoggedinUserData } from '../actions/actions';

class Header extends Component {

  componentDidMount() {
    fetch('http://localhost:7000/isLoggedin')
    .then(res => res.json())
    .then(data => {
      console.log(data,'data in action');
      this.props.getData(data);
    }) 
  }

  render() {

  const link = (this.props.user) ? <SignOutLink /> : <SignInLink />

    return (
      <div className='header'>
        <Link to='/'>
          <span className='logo'>
            <span className='logo-m'>M</span>
            <span className='logo-c'>C</span>
          </span>
        </Link>
        <nav>
          { link }
        </nav>
        
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData : (data) => dispatch(getLoggedinUserData(data))
  }
}

function mapStateToProps(state) {
  if(state) {
    return {
      user : state.fetchedUserData.user
    }
  } else {
    return {
      user : state
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
