import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';//eslint-disable-line
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react'
import { browserHistory } from 'react-router';
/** 用来创建主题 */
/* import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { lightBlue, pink } from 'material-ui/colors'; */
import App from './views/App';//eslint-disable-line


import { AppState, TopicsStore, Topic } from './store/store'


/** 创建主题 */
/* const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    accent: pink,
    type: 'light',
  },
}); */

/** 声明根节点 */
const root = document.getElementById('root');

/** 获取ejs中的服务端State */
const initialState = window.__INITIAL__STATE__ || {} ;// eslint-disable-line

const appState = new AppState(initialState.appState);
const topicsStore = new TopicsStore(initialState.topicsStore);
const topic = new Topic(initialState.topic);
/**
 * 声明一个渲染的方法66666
 * */
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState} topicsStore={topicsStore} topic={topic}>
        <BrowserRouter history={browserHistory}>
          {/*  <MuiThemeProvider theme={theme}> */}
          <Component />
          {/* </MuiThemeProvider> */}
        </BrowserRouter>
      </Provider>
    </AppContainer>, root,
  )
};


// ReactDOM.render(<App/>, document.getElementById('root'));
render(App);

const AppNew = require('./views/App.jsx');

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = AppNew.default;
    // ReactDOM.render(<NextApp/>, document.getElementById('root'));
    render(NextApp);
  })
}
