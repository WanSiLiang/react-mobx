const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    /** 静态资源引用时得一个路径,引用静态资源得url得拼接前缀
     * 如： app.hash.js是路径 则会拼接为 /public/app.hash.js
     * 帮我们区分静态资源或者特殊权限url
     * publicPath 需要与
     *  config.devServer 中的 publicPath 表示一样，否则会导致下次加载热部署的js文件路径错误
     * 1 */
    publicPath: '/public/',
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // {
      //   /** 在编译之前进行检查 */
      //   enforce: 'pre',
      //   test: /.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: [
      //     path.resolve(__dirname, '../node_modules'),
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              root: `${__dirname}/static/`,
              url: true,
              alias: {
                '@': `${__dirname}/static/`,
              },
              import: false,
              modules: false,
              minimize: true,
              sourceMap: true,
              camelCase: false,
              // importLoaders: 0 // 感觉没什么用
            },
          },
        ],
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        /** 此下面的JS代码不需要再次编译 */
        exclude: [
          path.join(__dirname, '../node_modules'),
        ],
      },
    ],
  },
};
