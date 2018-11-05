/* eslint-disable react/forbid-prop-types */
import React from 'react';

import { List, Avatar, Spin, message ,Tag} from 'antd'
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react'

@inject(stores => {
  return {
    appState:stores.appState,
    topicStore:stores.topicStore,
  }
})
@observer
export default class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
    this.changeHasMoreToTrue = this.changeHasMoreToTrue.bind(this);
  }
  componentDidMount() {

  }

  handleInfiniteOnLoad() {
    this.props.topicStore.loading = true;
    setTimeout(()=>this.props.topicStore.fetchTopicsAndMore(this.props.tabParam),1000)
  }

  changeHasMoreToTrue(){
    setTimeout(()=>this.props.topicStore.changeHasMoreToTrue(this.props.tabParam),3000);
  }

  render() {

    const {loading ,hasMore,topics} = this.props.topicStore;
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
              <List.Item>
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
  appState:PropTypes.object.isRequired,
  topicStore:PropTypes.object.isRequired,
};

ListItems.prototypes = {
  tabAttribute:PropTypes.string.isRequired,
  tabParam:PropTypes.string,
};


