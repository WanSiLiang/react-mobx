/* eslint-disable react/prop-types */
import React from 'react';
import { Layout, Menu, Tabs, Icon, Input } from 'antd';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {observer,inject} from 'mobx-react'

import ListItems from '../topic-list/list-item'

import { tabsAttribute } from '../../utils/constants'

const { TabPane } = Tabs;

@inject(stores => {
  return {
    topicsStore:stores.topicsStore,
  }
})
@observer
export default  class Homew extends React.Component {
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
    this.props.topicsStore.fetchTopicsAndMore(this.getTabParam());
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location !== this.props.location){
        this.props.topicsStore.fetchTopicsAndMore(queryString.parse(nextProps.location.search).tabParam);
    }
  }

  changeTab(activeKey) {
    this.props.topicsStore.sliceNum = 0 ;
    this.props.topicsStore.topics = [] ;
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

    const TabPanes = Object.keys(tabsAttribute)
      .map(tabkey => (
        <TabPane tab={tabsAttribute[tabkey].text} key={tabkey} >
          <ListItems tabAttribute={tabsAttribute[tabkey]} tabParam={tabParam}/>
        </TabPane>));

    return (
          <Tabs defaultActiveKey="all" activeKey={tabParam} style={{ background: '#f6f6f6' }} onChange={activeKey => this.changeTab(activeKey)}>
            {TabPanes}
          </Tabs>
    )
  }
}

Homew.prototypes = {
  location: PropTypes.object.isRequired,
  topicsStore:PropTypes.object.isRequired,
};
