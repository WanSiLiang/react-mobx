const path = require('path');
const express = require('express');
const serverRender = require('./util/server-render');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const favicon = require('serve-favicon');

const app = express();

const isDev = process.env.NODE_ENV === 'development';

app.use(favicon(path.join(__dirname, '../home.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class',
}));

/** 将/api/user   /api/ 的路径映射到 其他地方 */
app.use('/api/user', require('./util/handle-login'));
app.use('/api/', require('./util/proxy'));

if (!isDev) {
  /** 引入组件 入口文件 */
  const serverEntry = require('../dist/server-entry.js'); // eslint-disable-line

  const indexHTML = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8');

  app.use('/public', express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res, next) => {
    /* const appString = reactSSR.renderToString(serverEntry);
    res.send(indexHTML.replace('<!--<app></app>-->', appString)); */
    serverRender(serverEntry, indexHTML, req, res)
      .catch(next);
  });
} else {
  /**  dev环境下如何处理server */
  const devStatic = require('./util/dev-static');
  devStatic(app);
}
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(error);
});

app.listen(3333, () => {
  // console.log(indexHTML);
  console.log('server is listening on 3333')
});
