/** 使用绝对路径来控制路径， */
const path = require('path');

const baseConfig = require('./webpack.base');

const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    /** 作为打包得入口，根据他得依赖关系构建项目         */
    app: path.join(__dirname, '../client/server-entry.js'),
  },
  /** 减小服务端打包内容，依赖不进行压缩，避免出现多个mobx实例的警告 */
  externals: Object.keys(require('../package.json').dependencies),  //eslint-disable-line
  output: {
    /** 中括号代表变量 变量名代表 entry中得某些key */
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
  },
});
