'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Post = require('./models/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.connect('mongodb://localhost:27017/blog');

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.post('/posts', function (req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        text = _req$body.text;

    var post = new _Post2.default({ title: title, text: text });

    post.save().then(function () {
        res.send({ status: "ok!" });
    });
});

app.get('/posts', function (req, res) {
    _Post2.default.find().then(function (err, posts) {
        if (err) return res.send(err);

        res.json(posts);
    });
});

app.delete('/posts/:id', function (req, res) {
    _Post2.default.remove({
        _id: req.params.id
    }).then(function (post) {
        res.json({ status: post ? 'Deleted!' : 'Error!' });
    });
});

app.put('/posts/:id', function (req, res) {
    var id = req.params.id;

    var data = req.body;

    _Post2.default.findByIdAndUpdate(id, { $set: data }, function (err) {
        if (err) return res.send(err);

        res.json({ status: 'Update' });
    });
});

app.listen(3000, function () {
    console.log('port: 3000');
});