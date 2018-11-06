/* eslint-disable react/forbid-prop-types */
import React from 'react';

import { List, Avatar, Spin, message ,Tag} from 'antd'
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react'
import { browserHistory } from 'react-router'

@inject(stores => {
  return {
    topicsStore:stores.topicsStore,
  }
})
@observer
export default class ListItems extends React.Component {
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
    console.log('showTopicDetail',topicID);
    browserHistory.push('/detail');
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
};

ListItems.prototypes = {
  tabAttribute:PropTypes.string.isRequired,
  tabParam:PropTypes.string,
};


