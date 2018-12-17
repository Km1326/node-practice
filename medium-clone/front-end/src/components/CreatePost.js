import React, { Component } from 'react';
import { createPostAction } from '../actions/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state ={
      title : '',
      description : '',
      body : ''
    }
  }

  handleChange = (e) => {
    this.setState({ 
      [e.target.name] : e.target.value
     })
  }

  handleSubmit = (e) => {
    console.log(this.state)
    e.preventDefault();
    this.props.create(this.state);
  }

  render() {
    const {userId, fetchedUserId} = this.props;
    return (
      <div className='App'>
        <Header />
        {
          (userId || fetchedUserId)
          ? <div className='create-post' >
          <input type='text' name="title" 
            placeholder='Title'
            className='input-title' 
            onChange={this.handleChange} 
          />
          <input type='text' name="description" 
            placeholder='Description'
            className='input-desc' 
            onChange={this.handleChange} 
          />
          <textarea name='body' className='input-body' onChange={this.handleChange} placeholder='Story...'></textarea>
          <input type='submit' value='submit' onClick={this.handleSubmit} className='btn btn-post' />
        </div> 
        : <Redirect to='/' />
        }
        
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    create : (data) => dispatch(createPostAction(data))
  }
}

function mapStateToProps(state) {
  if(state) {
    return {
      userId : state.loggedInUser._id,
      fetchedUserId : state.fetchedUserData
    }
  } else {
    return {
      userId : state
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);