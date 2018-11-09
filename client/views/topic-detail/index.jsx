import React from 'react';
import { inject, observer } from 'mobx-react'
import PropTyeps from 'prop-types'

@inject(stores => {
  return {
    topic:stores.topic,
  }
})
@observer
export default class TopicDetail extends React.Component {
  componentWillMount() {

  }

  render() {
    console.log(this.props.topic);
    return (
      <div>
        1111111111111
        <p>ID 的一种拿法{this.props.topic.tt}</p>
        <p>ID 的另一种拿法{this.props.topic[0].id}</p>
      </div>
    )
  }
}

TopicDetail.prototypes = {
  topic : PropTyeps.object.isRequired,
};
