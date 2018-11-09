/* eslint-disable react/forbid-prop-types */
import React from 'react';

import { List, Avatar, Spin, message ,Tag} from 'antd'
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react'

import {Topic} from '../../store/topics-store'

@inject(stores => {
  return {
    topicsStore:stores.topicsStore,
    topic:stores.topic,
  }
})
@observer
export default class ListItems extends React.Component {
  // 这一步7779999是重点77888
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
    this.changeHasMoreToTrue = this.changeHasMoreToTrue.bind(this);
    this.showTopicDetail = this.showTopicDetail.bind(this);
  }
  componentDidMount() {

  }

  handleInfiniteOnLoad() {
    this.props.topicsStore.loading = true;
    setTimeout(()=>this.props.topicsStore.fetchTopicsAndMore(this.props.tabParam),1000)
  }

  changeHasMoreToTrue(){
    setTimeout(()=>this.props.topicsStore.changeHasMoreToTrue(this.props.tabParam),3000);
  }

  showTopicDetail(topicID){
    let currentTopic = this.props.topicsStore.topics.filter((topic) => topic.id === topicID);
    this.props.topic.fillTopic(currentTopic);
    this.props.topic.tt =  topicID;
    //麻烦老师帮忙看看 为什么这个组件的this.props.history = undefinded
    //他的父组件  ./home /index.jsx  this.props.history 就是 react-router-dom 提供的 history 对象
    this.context.router.history.push({
      pathname:`./detail`
      })

  }
  render() {

    const {loading ,hasMore,topics} = this.props.topicsStore;
    const {tabAttribute} = this.props;
    if (!hasMore) {
      message.warning('已获取全部数据');
      this.changeHasMoreToTrue();
    }
    return (
      <div style={{ overflow: 'auto',
        padding: '8px 24px',
        height: '300px' }}
      >
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={! loading && hasMore}
          useWindow={false}
        >
          <List
            dataSource={topics}
            renderItem={item => (
              <List.Item onClick={() => this.showTopicDetail(item.id)}>
                <List.Item.Meta
                  avatar={<Avatar src={item.author.avatar_url} />}
                  title={ <span>
                   <Tag color={ item.top ? '#f50': tabAttribute.color}> { item.top ? '置顶' :tabAttribute.text}</ Tag>
                    {`${item.reply_count} /  ${item.visit_count}`}
                    </span>}
                  description={item.title}
                />
                <div>{item.last_reply_at}</div>
              </List.Item>
            )}
          >
            {loading && hasMore && (
            /* <div className="demo-loading-container"> */
              <Spin  />
            /* </div> */
            )}
          </List>
        </InfiniteScroll>
      </div>
    )
  }
}
ListItems.wrappedComponent.propTypes={
  topicsStore:PropTypes.object.isRequired,
  topic:PropTypes.object.isRequired,
};

ListItems.prototypes = {
  tabAttribute:PropTypes.string.isRequired,
  tabParam:PropTypes.string,
};


