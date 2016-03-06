/**
 * Created by nikeuk on 23.02.16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongojs');

var app = express();
app.use(bodyParser.json());
app.get('/', function(req, res){
    console.log('i received the get request');  //TODO тут можно ченить записать
    res.status(200).send('Ok');
});
app.get('/test', function(req, res){
   console.log('i received the get request to test');
    res.status(200).send('>Hello Cruel World<');
});
app.post('/test', function(req, res){
    console.log('I received the POST request');
    var data = req.body;
    data[mData] = new date();
    console.log(data);
    res.status(200).send('Post test');
});
express.
app.listen(3000);
console.log('Server rinning on port 3000');