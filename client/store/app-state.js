import {observable, computed, action} from 'mobx'

export default class AppState {
  /** 简历构造函数以方便服务端的数据渲染进来*/
  constructor({count, name} = {count: 0, name: 'wsl'}) {
    this.count = count;
    this.name = name;
  }

  @observable count;
  @observable name ;

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1;
  }

  @action changeName(name) {
    this.name = name;
  }

  /** 用于服务端 得到的数据，以json的格式放在 客户端能拿到的地方*/
  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}
