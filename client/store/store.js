import AppState from './app-state';
import TopicStore from './topic-store'

export { AppState, TopicStore }

export default {
  AppState,
  TopicStore,
}

/** 专门用户给服务端渲染用的StoreMap */
export const createStoreMap = () => {
  return {
    appState: new AppState(),
    topicStore: TopicStore(),
  }
};
