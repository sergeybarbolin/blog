import PostModel from './../models/Post';

export default class PostController {
    index(req, res) {
        PostModel.find()
        .then(( err, posts ) => {
            if (err) return res.send(err);
    
            res.json(posts);
        })
    }

    create(req, res) {
        const { title, text } = req.body;
        const post = new PostModel({ title, text });
        
        post.save().then(() => {
            res.send({ status: "ok!" })
        })
    }

    read(req, res) {
        const { id } = req.params;

        PostModel.findOne({ _id: id })
        .then(post => res.json( post ? post : { error: 'not found' } ) )
    }

    update(req, res) {
        const { id } = req.params;
        const data = req.body;
         
        PostModel.findByIdAndUpdate(id, {$set: data}, err => res.json( 
            err ? { error: err } : { status: 'Update' }
        ))
    }

    delete(req, res) {
        PostModel.deleteOne({
            _id: req.params.id
        })
        .then(post => {
            res.json({ status: post.deletedCount ? 'Deleted!' : 'Error!' });
        })
    }
}