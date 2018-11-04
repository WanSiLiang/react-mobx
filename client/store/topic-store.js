import { observable, toJS, action, computed, extendObservable ,autorun} from 'mobx'
import axios from 'axios'


class Topic {
  constructor(data) {
    extendObservable(this, data);
  }

  @observable loading = false;
}

export default class TopicStore {
  @observable topics;
  @observable loading ;
  @observable sliceNum;
  @observable hasMore ;

  constructor({ loading, topics ,sliceNum,hasMore} = { loading: false, topics: [] ,sliceNum:0,hasMore:true}) {
    this.loading = loading;
    this.topics = topics.map(topic => new Topic(topic));
    this.sliceNum = sliceNum;
    this.hasMore = hasMore;
  }

  @action changeHasMoreToTrue(){
    if (!this.hasMore) {
      this.hasMore = true;
    }
  }

  @action fetchTopicsAndMore(){
    return  new Promise(((resolve, reject) => {
      this.loading = true;
      axios.get('https://cnodejs.org/api/v1/topics')
        .then((resp) => {
          if (200 === resp.status ) {
            if (this.topics.length === resp.data.data.length || this.topics.length > 30) {
              this.loading = false;
              this.hasMore = false;
              return;
            }
            const sliceNumNew = this.sliceNum + 1;
            resp.data.data.slice(0, sliceNumNew * 8).forEach(topic => {
              this.topics.push(new Topic(topic))
            });
            this.loading = false;
            this.sliceNum = sliceNumNew;
            resolve()
          }else {
            reject()
          }
        }).catch(err => {
          reject(err);
          this.loading = false;
      })
    }))
  }

}

