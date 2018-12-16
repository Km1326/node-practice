import React, { Component } from 'react';
import { createPostAction } from '../actions/actions';
import { connect } from 'react-redux';

class CreatePost extends Component {

  state ={
    title : '',
    description : '',
    body : ''
  }

  handleChange = (e) => {
    this.setState({ 
      [e.target.name] : e.target.value
     })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.create(this.state);
  }

  render() {
    return (
      <div className='create-post' >
        <input type='text' name="title" 
          placeholder='title'
          className='input-title' 
          onChange={this.handleChange} 
        />
        <input type='text' name="description" placeholder='description' onChange={this.handleChange} />
        <textarea name='body' onChange={this.handleChange}></textarea>
        <input type='submit' value='submit' onClick={this.handleSubmit} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    create : (data) => dispatch(createPostAction(data))
  }
}

export default connect(null, mapDispatchToProps)(CreatePost);