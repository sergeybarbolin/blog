import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import PostModel from './models/Post';
import Post from './models/Post';

const app = express();

mongoose.connect('mongodb://localhost:27017/blog');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.post('/posts', (req, res) => {
    const { title, text } = req.body;
    const post = new PostModel({ title, text });
    
    post.save().then(() => {
        res.send({ status: "ok!" })
    })
});

app.get('/posts', (req, res) => {
    PostModel.find()
    .then(( err, posts ) => {
        if (err) return res.send(err);

        res.json(posts);
    })
})

app.delete('/posts/:id', (req, res) => {
    PostModel.remove({
        _id: req.params.id
    })
    .then(post => {
        res.json({ status: post ? 'Deleted!' : 'Error!' });
    })
})

app.put('/posts/:id',  (req, res) => {
    const { id } = req.params;
    const data = req.body;
     
    PostModel.findByIdAndUpdate(id, {$set: data}, err => {
        if (err) return res.send(err);

        res.json({ status: 'Update' });
    })
})

app.listen(3000, () => { console.log('port: 3000') })