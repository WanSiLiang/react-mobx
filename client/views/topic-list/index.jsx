import React from 'react';
import { observer,inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
/*import Button from 'material-ui/Button';*/

import AppState from '../../store/app-state'



@inject('appState')
@observer
export default class TopicList extends React.Component {
  constructor(){
    super();
    this.changeName = this.changeName.bind(this);
  }

  componentWillMount() {

  }
  /** 服务端会调用这个方法之后才调用组件渲染*/
  asyncBootstrap(){
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('before');
        this.props.appState.count = 3;
        this.props.appState.name = 'sfs';
        console.log(this.props.appState.count);
        console.log('after');
        /** 该方法 以resolve 来决定是否完成*/
        resolve(true);
      });
    })
  }

  changeName (event){
    this.props.appState.changeName(event.target.value)
  }

  render() {
    return (
      <div>
        <Helmet >
          <title>this is topic list</title>
          <meta name="description" content="this is description"/>
        </Helmet>
     {/*   <Button raised color="primary">This is button</Button>*/}
        <input type="text" onChange={this.changeName} />
       <span>{this.props.appState.msg}</span>
      </div>
    )

  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

