import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import PostController from './controllers/PostController';

const app = express();
const Post = new PostController();

mongoose.connect('mongodb://localhost:27017/blog');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.get('/posts', Post.index);
app.post('/posts', Post.create);
app.get('/posts/:id', Post.read);
app.delete('/posts/:id', Post.delete);
app.put('/posts/:id', Post.update);

app.listen(3000, () => { console.log('port: 3000') })