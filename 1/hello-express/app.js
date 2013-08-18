'use strict';

var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var mc = new MongoClient(new Server('localhost', 27017, {
        'native_parser': true
    }));
var db = mc.db('course');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    db.collection('hello_mongo_express').findOne({}, function (err, doc) {
        res.render('hello', doc);
    });
});

app.get('*', function (req, res) {
    res.send('Page not found', 404);
});

mc.open(function (err) {

    if (err) {
        throw err;
    }

    app.listen(8080);

    console.log('Express server started on port 8080...');
});
