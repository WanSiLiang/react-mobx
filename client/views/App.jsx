import React from 'react'
import { Link } from 'react-router-dom'

import Routes from '../config/router'

// export default () => (
//   <div>
//     This is My App 12345678
//   </div>
// )

export default class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return [
      <div key="root">
        <Link to="./">首页</Link>
        <br />
        <Link to="./detail">详情页</Link>
        <br />
        <Link to="./testApi">testApi</Link>
        <br />
        <Link to="./homew">homew</Link>
      </div>,
      <Routes key="routes" />,
    ]
  }
}
