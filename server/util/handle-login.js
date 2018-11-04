const router = require('express').Router();
const axios = require('axios');

const baseUrl = 'http://cnodejs.org/api/v1';

router.post('/login', (req, res, next) => {
  console.log('req.body.accessToken', req.body.accessToken);
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken,
  })
    .then((resp) => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url,
        };
        res.json({
          sucess: true,
          data: resp.data,
        })
      }
    })
    .catch((err) => {
      console.log('err.response', err.response);
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data,
        })
      } else {
        console.log('err', err);
        next(err)
      }
    })
});

module.exports = router;
