import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class TestApi extends React.Component {
  constructor (props) {
    super(props);
    this.getTopics = this.getTopics.bind(this);
    this.login = this.login.bind(this);
    this.markAll = this.markAll.bind(this);
  }
  getTopics () {
    axios.get('/api/topics')
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  }

  login() {
    axios.post('/api/user/login', {
      accessToken : 'f6073bcb-3667-4954-b162-eebd31738b17'
    }).then(resp => {
      console.log(resp)
    }).catch(err => {
      console.log(err)
    })
  }

  markAll () {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(resp => {
        console.log(resp)
      }).catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-enable */
