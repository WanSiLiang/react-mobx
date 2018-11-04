/** 使用绝对路径来控制路径， */
const path = require('path');

/** 生成一个HTML的页面并且把entry 注入到这里 */
const HTMLPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

const baseConfig = require('./webpack.base');

const webpackMerge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

const config = webpackMerge(baseConfig, {
  entry: {
    /** 作为打包得入口，根据他得依赖关系构建项目         */
    app: path.join(__dirname, '../client/app.js'),
  },
  output: {
    /** 中括号代表变量 变量名代表 entry中得某些key */
    filename: '[name].[hash].js',
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html'),
    }),
    /** 该模板是用来链接服务端和客户端，存储Store数据 */
    new HTMLPlugin({
      template: `!!ejs-compiled-loader!${path.join(__dirname, '../client/server.template.ejs')}`,
      filename: 'server.ejs',
    }),
  ],
});

if (isDev) {
  /**
   * bable 里面的插件   "plugins": [
   "react-hot-loader/babel"
   ]是在开发环境下用，
   所以开发环境下要更改一些配置
   这个会把相应的配置都打包到一个目录下
   * */
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js'),
    ],
  };
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    /** webpack-dev-server是在output路径下面启动的 */
    contentBase: path.join(__dirname, '../dist'),
    /** 热部署的开关 */
    hot: true,
    overlay: {
      errors: true,
    },
    publicPath: '/public/',
    historyApiFallback: {
      /** 所有404的请求全部返回到这个路径 */
      index: '/public/index.html',
    },
    proxy: {
      /** /api 下的所有请求都代理到映射的路径 */
      '/api': 'http://localhost:3333',
    },
  };
  /** 这个包在webpack里面，所以需要引用webpack包 */
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;
