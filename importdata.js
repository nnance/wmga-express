var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    _ = require('underscore'),
    config = require('./config/config'),
    passwordHash = require('password-hash'),
    stdio = require('stdio'),
    ops = stdio.getopt({
        'model': {args: 1, description: 'Model name', mandatory: true},
        'json': {args: 1, description: 'JSON file', mandatory: true},
        'root': {args: 1, description: 'Root array element', mandatory: true}
    });

console.log(config.db);
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});

console.log('model: ' + ops.model);
console.log('json: ' + ops.json);
console.log('root: ' + ops.root);

var file = __dirname + '/' + ops.json;

var getCount = function(model, callback) {
    model.count({}, function (err, count) {
        if (err) console.log(err);
        console.log('there are %d documents', count);
        callback.call(this, err, count);
    });
};

fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);

    var root = data[ops.root];
    console.log('obj count: ' + root.length);

    _.each(root, function(item){
        delete item.id;
        if (ops.json.indexOf('news') > -1) {
            item.text = item.description;
        } else if (ops.json.indexOf('events') > -1) {
            item.startdate = item.date + ' ' + item.starttime;
            item.enddate = item.enddate + ' ' + item.endtime;
        } else if (ops.json.indexOf('results') > -1) {
            item.text = item.description;
        } else if (ops.json.indexOf('members') > -1) {
            item.paid = false;
            item.passwordHash = passwordHash.generate(item.password);
        }
    });

    var Document = mongoose.model(ops.model);

    getCount(Document,function(err,count){
        Document.remove({}, function(err){
            if (err) console.log(err);
            Document.create(root, function(err){
                if (err) console.log(err);
                console.log('done loading');

                getCount(Document,function(){
                    db.close();
                });
            });
        });
    });
});
