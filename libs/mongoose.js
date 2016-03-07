/**
 * Created by nikitaukolov on 07.03.16.
 */
var mongoose = require('mongoose');
var config = require('./config');
var log = require('./log')(module);
var url = config.get("mongoose:uri");

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', function(err){
   log.error('Connection error', err.message);
});

db.once('open', function callback () {
   log.info("Connected to db");
});

var Schema = mongoose.Schema;

var Weather = new Schema({
    room: { type: String, required: true},
    sensor: { type: String, required: true },
    value: { type: Number, required: true},
    mDate: { type: Date, default: Date.now}
});

var WeatherModel = mongoose.model('Weather', Weather);

module.exports.WeatherModel = WeatherModel;