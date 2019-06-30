const Post = require("../models/post");

exports.postAddPost = (req, res, next) => {
  const author = req.body.author;
  const description = req.body.description;
  const image = req.body.image;
  const category = req.body.category;

  const post = new Post(author, description, image, category);
  post
    .save()
    .then(result => {
      // console.log(result);
      console.log("Created Post");
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getPosts = (req, res, next) => {
  Post.fetchAll()
    .then(posts => {
      console.log(posts.length);
      res.status(200).json({ posts });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addVote = (req, res, next) => {
  const postId = req.body.id;

  Post.updateVote(postId)
    .then(() => {
      res.status(200).json({});
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addComment = (req, res, next) => {
  const postId = req.body.id;
  const user = req.body.comment.user;
  const text = req.body.comment.text;

  Post.updateComment(postId, { user, text })
    .then(() => {
      res.status(200).json({});
    })
    .catch(err => {
      console.log(err);
    });
}
