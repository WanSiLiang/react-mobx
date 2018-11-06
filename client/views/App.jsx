import React from 'react'
import { Layout, Menu, Icon, Input } from 'antd';

import Routes from '../config/router'

// export default () => (
//   <div>
//     This is My App 12345678
//   </div>
// )
const { Header, Footer, Content } = Layout;
const { Item: MenuItem } = Menu;
const Search = Input.Search;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuNames: ['首页', '未读消息', '新手入门', 'API', '关于', '设置', '退出'],
    };
  }

  componentDidMount() {

  }

  render() {
    const { menuNames = [] } = this.state;
    const MenuIems = Array.from(menuNames,
      menuName => (<MenuItem key={menuName} style={{ margin: 'auto' }}>{menuName}</MenuItem>));
    return [
      <div key="root">
        <Layout>
          <Header style={{ background: '#444' }}>
            <div style={{ float: 'left', background: '#444', marginRight: '30px' }}>
              <Icon type="mail" />Navigation One
            </div>
            <div style={{ float: 'left', background: '#444', marginRight: '30px' }}>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                enterButton
              />
            </div>
            <Menu mode="horizontal" style={{ lineHeight: '64px', background: '#444' }} theme="dark">
              {MenuIems}
            </Menu>
          </Header>
          <Content >
            <Routes key="routes" />,
          </Content>
          <Footer>
            Footer
          </Footer>
        </Layout>
      </div>,
    ]
  }
}
