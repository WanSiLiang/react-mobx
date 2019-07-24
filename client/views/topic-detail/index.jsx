import React from 'react';
import {inject, observer} from 'mobx-react'
import {autorun} from 'mobx'
import PropTyeps from 'prop-types'

@inject(stores => {
  return {
    topic: stores.topic,
  }
})
@observer
export default class TopicDetail extends React.Component {

  // 如果在这里对 Store 进行解引用
  // 在 render 中如果改变了 author 引用，不会导致页面渲染。因为   author 和 topic 的关系已经在这里断开
  // 但是如果只是 改变 author 中的值，是可以继续导致页面渲染 ，因为那时 ，author 还是指向 旧的地址。可以被观察感知
  author = this.props.topic.author;

  constructor(props) {
    super(props);
    this.showStoreInfo = this.showStoreInfo.bind(this);

  }

  componentDidMount() {
    let {title,author} = this.props.topic;
    autorun(() =>{
      console.log('TopicDetail.componentDidMount autorun ==== >' + title);
      console.log('TopicDetail.componentDidMount autorun ==== >' + author.name);
    })
  }

  showStoreInfo() {
    return <div>
      <div> TopicDetail.render {this.props.topic.title}</div>

    </div>
  }

  render() {
    console.log(this.props.topic);
    const author = this.props.topic.author;
    const SomeContainer = ({title}) => {
      return <div>
        SomeContainer {title()}
      </div>
    };
    const MyComponent = observer(({message}) =>
      <SomeContainer
        title={() => <span>{message.title}</span>}
      />
    );

    return (
      <div>
        1111111111111
        <MyComponent message={this.props.topic}></MyComponent>
        {/*抽取 渲染函数可以被观察，与 官网所描述的不一致*/}
        {this.showStoreInfo()}
        <button onClick={() => this.props.topic.setTitle('wsl')}>setTitle</button>
        <br/>
        <button onClick={() => this.props.topic.setAuthor({name :'wwwwww'})}>changeAuthor</button>
        <br/>
        <button onClick={() => this.props.topic.setAuthorName('authorName')}>changeAuthor.name</button>

        <div>{author.name}</div>
        {/*<p>ID 的一种拿法{this.props.topic.tt}</p>*/}
        {/*<p>ID 的另一种拿法{this.props.topic[0].id}</p>*/}
      </div>
    )
  }
}

TopicDetail.prototypes = {
  topic: PropTyeps.object.isRequired,
};
