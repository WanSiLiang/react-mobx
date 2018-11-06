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
    return (
      <div>{this.props.topic.id}</div>
    )
  }
}

TopicDetail.prototypes = {
  topic : PropTyeps.object.isRequired,
};
