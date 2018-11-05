/* eslint-disable react/prop-types */
import React from 'react';
import { Layout, Menu, Tabs, Icon, Input } from 'antd';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {observer,inject} from 'mobx-react'

import ListItems from '../topic-list/list-item'

import { tabsAttribute } from '../../utils/constants'

const { Header, Footer, Content } = Layout;
const { Item: MenuItem } = Menu;
const { TabPane } = Tabs;
const Search = Input.Search;

@inject(stores => {
  return {
    appState:stores.appState,
    topicStore:stores.topicStore,
  }
})
@observer
export default class Homew extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      menuNames: ['首页', '未读消息', '新手入门', 'API', '关于', '设置', '退出'],
    };
    this.changeTab = this.changeTab.bind(this);
    this.getTabParam = this.getTabParam.bind(this);
  }


  componentDidMount() {
    this.props.topicStore.fetchTopicsAndMore(this.getTabParam());
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location !== this.props.location){
        this.props.topicStore.fetchTopicsAndMore(queryString.parse(nextProps.location.search).tabParam);
    }
  }

  changeTab(activeKey) {
    this.props.topicStore.sliceNum = 0 ;
    this.props.topicStore.topics = [] ;
    this.props.history.push({
      pathname: './homew',
      search: `?tabParam=${activeKey}`,
    })
  }

  getTabParam(){
    const query = queryString.parse(this.props.location.search);
    return query.tabParam || 'all';
  }

  render() {
    const tabParam = this.getTabParam();
    const { menuNames = [] } = this.state;
    const MenuIems = Array.from(menuNames,
      menuName => (<MenuItem key={menuName} style={{ margin: 'auto' }}>{menuName}</MenuItem>));

    const TabPanes = Object.keys(tabsAttribute)
      .map(tabkey => (
        <TabPane tab={tabsAttribute[tabkey].text} key={tabkey} >
          <ListItems tabAttribute={tabsAttribute[tabkey]} tabParam={tabParam}/>
        </TabPane>));

    return (
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
          <Tabs defaultActiveKey="all" activeKey={tabParam} style={{ background: '#f6f6f6' }} onChange={activeKey => this.changeTab(activeKey)}>
            {TabPanes}
          </Tabs>
        </Content>
        <Footer>
            Footer
        </Footer>
      </Layout>
    )
  }
}

Homew.prototypes = {
  location: PropTypes.object.isRequired,
  appState:PropTypes.object.isRequired,
  topicStore:PropTypes.object.isRequired,
};
