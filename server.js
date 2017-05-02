/**
 * Created by BartDukes on 22.07.2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var port = 3333;

var app = express();
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/ws/auth', require('./server/controllers/ws/auth'));
app.use('/ws/sessions', require('./server/controllers/ws/sessions'));

app.use(require('./server/controllers/static'));

app.listen(port, function(){
    console.log('Serwer is running on: ' + port);
});