import React from 'react';
import {inject, observer} from 'mobx-react'


const Message = observer(({message}) =>
  <div>
    {/*<div> Message render ===> {message.title}</div>*/}
    {/*<Author author={message.author}/>*/}
    {/*<Likes likes={message.likes}/>*/}
    {/*<Likes3 obj={message.author}/>*/}
    <Likes2 arrObjs={message.arrObjs}/>

  </div>
)

const Author = observer(({author}) =>
  <span> Author render ====>{author.name}</span>
)

const Likes = observer(({likes}) =>
  <ul>
    <li>Likes render ====></li>
    {likes.map((like,index) =>
      <li key={'Likes' +index}>{like}</li>
    )}
  </ul>
)

const Likes2 = (({arrObjs}) =>
  <ul>
    <li>Likes2 render ====></li>
    {arrObjs.map((arrObj,index) =>
      <li key={'Likes2' +index}>{arrObj.title}</li>
    )}
  </ul>
)

const Likes3 = observer(({obj}) =>
  <div>Likes3 render ===> {obj.like}</div>
)

@inject(stores => {
  return {
    topicsStore: stores.topicsStore,
    topic: stores.topic,
  }
})
@observer
export default class ArrObjs extends React.Component {

  componentDidMount() {
    let {topic} = this.props;
    topic.set
  }

  render() {
    let {topic} = this.props;
    return (
      <div>
        <button onClick={() => topic.setTitle('wsl')}>changeTitle</button>
        <button onClick={() => topic.setLikes()}>changeLikes</button>
        <button onClick={() => topic.setArrObjs()}>changeLikes2</button>
        <button onClick={() => topic.setAuthorLike()}>setAuthorLike</button>
        <Message message={topic} />
      </div>
    )
  }

}
