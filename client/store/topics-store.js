import {observable, toJS, action, computed, extendObservable, autorun} from 'mobx'
import axios from 'axios'


export class Topic {
  constructor(data = {}) {
    extendObservable(this, data);
  }

  @observable loading = false;
  @observable tt;

  @action fillTopic(topic = {}) {
    extendObservable(this, topic);
  }

  @observable title = "Bar"

  @action setTitle(title) {
    this.title = title;
  }

  @observable  author = {
    name: "Michel",
    like: 'like'
  }

  @action setAuthor(author) {
    this.author = author;
  }

  @action setAuthorLike() {
    this.author.like = 'wsl';
  }

  @action setAuthorName(authorName) {
    this.author.name = authorName;
  }

  @observable  likes = [
    "John", "Sara"
  ]

  @action setLikes(){
    this.likes[1] = 'wsl';
  }

  @observable arrObjs = [
    {title: "Spoil tea", completed: true},
    {title: "Make coffee", completed: false}
  ]

  @action setArrObjs(){
    let t1 = new Date().getTime();
    let arr = new Array(15000).fill({
      title: "Spoil tea", completed: true
    })
    let t2 = new Date().getTime();
    console.log('15000 Store 注入时 耗时' + (t2 - t1));
    this.arrObjs = arr;
    // this.arrObjs[1].title = 'wsl'
  }
}

export default class TopicsStore {
  @observable topics;
  @observable loading;
  @observable sliceNum;
  @observable hasMore;

  constructor({loading, topics, sliceNum, hasMore} = {loading: false, topics: [], sliceNum: 0, hasMore: true}) {
    this.loading = loading;
    this.topics = topics.map(topic => new Topic(topic));
    this.sliceNum = sliceNum;
    this.hasMore = hasMore;
  }

  @action changeHasMoreToTrue() {
    if (!this.hasMore) {
      this.hasMore = true;
    }
  }

  @action fetchTopicsAndMore(tab) {
    return new Promise(((resolve, reject) => {
      this.loading = true;
      axios.get('https://cnodejs.org/api/v1/topics', {
        params: {
          tab,
        }
      })
        .then((resp) => {
          if (resp.status === 200) {
            if (this.topics.length === resp.data.data.length || this.topics.length > 30) {
              this.loading = false;
              this.hasMore = false;
              return;
            }
            const sliceNumNew = this.sliceNum + 1;
            resp.data.data.slice(0, sliceNumNew * 8).forEach((topic) => {
              this.topics.push(new Topic(topic))
            });
            this.loading = false;
            this.sliceNum = sliceNumNew;
            resolve()
          } else {
            reject()
          }
        }).catch((err) => {
        reject(err);
        this.loading = false;
      })
    }))
  }
}

