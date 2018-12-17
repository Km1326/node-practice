import React, { Component } from 'react';
import Header from './Header';

class DashBoard extends Component {

  state = {
    allData : []
  }

  componentWillMount = () => {
    fetch('http://localhost:7000/dashboard')
    .then(res => res.json())
    .then(data => {
      this.setState({
        allData : data.data
      })
    })
  }

  render() {
    const allData = this.state.allData;
    var dataArray = [];
    var key = 0;
    allData.map((dataObj, i) => {
      dataObj.allPosts.map((obj, j) => {
        var url = `/story/:${obj.title}`;
        dataArray.push(<div key={key++} className='show-post'>
          <a href={url} className='show-title'>{obj.title}</a>
          <p className='show-desc'>{obj.description}</p>
          <span className='show-username'></span>
          <span>{obj.date}</span>
        </div>)
      })
    })
    return (
      <div>
        <Header />
        <section className='wrapper'>
        {
          dataArray.map(v => v)
        }
        </section>
      </div>
    )
  }
}

export default DashBoard;
