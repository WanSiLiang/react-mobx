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
        {this.props.topic.tt}
        {this.props.topic[0].id}
      </div>
    )
  }
}

TopicDetail.prototypes = {
  topic : PropTyeps.object.isRequired,
};
