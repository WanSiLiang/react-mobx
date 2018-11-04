/** 通过Http请求拿去放在 服务器上的文件 */
const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');
const path = require('path');
const NativeModule = require('module');
const vm = require('vm');


const serverConfig = require('../../build/webpack.config.server');
const serverRender = require('./server-render');
/** 注册一个全局变量 */
let serverBundle;

/** 获取 前端入口文件 */
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    /** 入口文件从 index.html 改成 server.ejs 是为了拿数据 */
    axios.get('http://localhost:8888/public/server.ejs')
      .then((res) => {
        resolve(res.data);
      })
      .catch(reject)
  })
};

/** 启动serverCompiler
 * serverCompiler 可以监听entry依赖的文件是不是有变化
 * 如果有变化 会重新打包
 * */
const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFs();
/** 用于将下面的 bundle 从json 转化程一个配置项类 */
/* const Module = module.constructor; */
// `(function(exports, require, module, __finename, __dirname){ ...bundle code })`

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} };
  const wrapper = NativeModule.wrap(bundle);
  const script = new vm.Script(wrapper, {
    filename,
    displayErrors: true,
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m
};

/** webpack提供的一个配置项 */
serverCompiler.outputFileSystem = mfs;

/**
 * stats 是打包的相关信息
 * */
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    console.log('err');
    throw err;
  }
  stats = stats.toJson();
  stats.errors.forEach(errs => console.error(errs)); //eslint-disable-line
  stats.warnings.forEach(warn => console.warn(warn));//eslint-disable-line

  /** 接下来要读取 server bundle 的信息
     *   serverConfig.output.path,路径 下的 serverConfig.output.filename 文件名
     * */
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename,
  );

  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  /*  const m = new Module();
  m._compile(bundle, 'server-entry.js'); */
  const m = getModuleFromString(bundle, 'server-entry.js');
  serverBundle = m.exports;
});

/**  同步客户端和服务端的store
 *forEach(), filter(), reduce(), every() 和some()都会跳过空位。
 * // reduce方法
 [1,,2].reduce((x,y) => x+y) // 3
 *
 * reduce(fn,initValue)接收2个参数。
 * 第一个是迭代器函数，函数的作用是对数组中从左到右的每一个元素进行处理。函数有4个参数，分别是accumulator、currentValue、currentIndex、array。
 accumulator 累加器，即函数上一次调用的返回值。
 第一次的时候为 initialValue || arr[0]
 currentValue 数组中函数正在处理的的值
 第一次的时候initialValue || arr[1]
 currentIndex 数组中函数正在处理的的索引
 array 函数调用的数组
 initValue reduce 的第二个可选参数，累加器的初始值。没有时，累加器第一次的值为currentValue；
 ---------------------
 作者：q1325545052
 来源：CSDN
 原文：https://blog.csdn.net/q1325545052/article/details/78851786?utm_source=copy
 版权声明：本文为博主原创文章，转载请附上博文链接！
 *
 * */
/* const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result
  }, {})
}; */

module.exports = function (app) { //eslint-disable-line
  app.use('/public', proxy({
    target: 'http://localhost:8888',
  }));

  app.get('*', (req, res, next) => {
    /** 当serverbundle 不存在时，优化代码*/
    if (!serverBundle) {
      return res.send('waiting for compile, refresh later')
    }
    getTemplate()
      .then((template) => {
        return serverRender(serverBundle, template, req, res);
      })
      .catch(next);
  })
};
