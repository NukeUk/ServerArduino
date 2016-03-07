/**
 * Created by nikeuk on 23.02.16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var log = require('./libs/log')(module);
var config = require('./libs/config');
var SensorsModel = require('./libs/mongoose').WeatherModel;


//var mongo = require('mongojs');

var app = express();

app.use(bodyParser.json());
//app.use(express.favicon());// отдаем стандартную фавиконку TODO разобраться что такое фавиконка
//app.use(express.logger('dev')); // выводим все запросы сос татусами в консоль
//app.use(app.router); //модуль для простого задания обработчиков путей
app.use(express.static(path.join(__dirname,"public")));

app.get('/api', function(req, res){
    res.status(200).send('API is runing');

});



// собственно API
app.get('/api/sensors', function(req, res){
    return SensorsModel.find(function(err, sensors){
        if(!err){
            return res.send(sensors);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d) : %s', res.statusCode, err.message);
            return res.send({ error: 'Server error'});
        }
    });

    //status(200).send('this is not implemented now');
});
app.post('/api/sensors', function(req, res){
    var sensor = new SensorsModel({
        room: req.body.room,
        sensor: req.body.sensor,
        value: req.body.value
    });

    sensor.save(function (err) {
        if (!err) {
            log.info('sensor data saved');
            return res.status(200).send('OK');
        } else {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.status(400).send( { error: 'Validation error'});
            } else {
                res.status(500).send({ error: 'Server error'});
            }
            log.error('Internal error(%d) : %s', res.statusCode, err.message);
        }

    });

    //res.status(200).send('this is not implemented now');
});


app.get('/api/sensors/:id', function(req, res){
    res.status(200).send('this is not implemented now');
});
app.put('/api/sensors/:id', function(req, res){
    res.status(200).send('this is not implemented now');
});
app.delete('/api/sensors/:id', function(req, res){
    res.status(200).send('this is not implemented now');
});
// конец API

// тренировочные GRUD
app.get('/', function(req, res){
    log.info('i received the get request');  //TODO тут можно ченить записать
    res.status(200).send('Ok');
});

app.get('/test', function(req, res){
   log.info('i received the get request to test');
    res.status(200).send('>Hello Cruel World<');
});
app.post('/test', function(req, res){
    log.info('I received the POST request');
    var data = req.body;
    data["mData"] = new Date();
    log.info(data);
    res.status(200).send('Post test');
});
// Конец пробных обработчиков


//обработка ошибок
app.use(function(req, res,next){
    res.status(404);
    log.debug('Not found url: %s', req.url);
    res.send({error: 'Not found'});
    return;

});

app.use(function(err, req, res,next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({error: err.message});
    return;
});

app.get('ErrorExample', function(req, res, next){
    next(new Error('Random error'));
});
// конец обработки ошибок
// запускаем сервер
app.listen(config.get('port'), function(){
    log.info('Server rinning on port ' + config.get('port'));
});
