import AppState from './app-state';
import TopicsStore, { Topic } from './topics-store'

export { AppState, TopicsStore, Topic }

export default {
  AppState,
  TopicsStore,
  Topic,
}

/** 专门用户给服务端渲染用的StoreMap */
export const createStoreMap = () => {
  return {
    appState: new AppState(),
    topicsStore: new TopicsStore(),
    topic: new Topic(),
  }
};
