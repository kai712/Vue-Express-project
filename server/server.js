const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api');
const router = require('./router');

app.use(express.static('public'));
app.use(session({
  secret: Math.random().toString(36).substr(2),
  cookie: {maxAge: 60 * 1000 * 300}
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.all('*',(req, res, next) => {
  if(req.path !== '/api/register' && req.path !== '/api/login' && req.path !== '/api/logOff' && !req.session.sign){
    res.json({
      result: false
    })
  }else{
    next()
  }
});

router.app(app);



app.listen(8000);
