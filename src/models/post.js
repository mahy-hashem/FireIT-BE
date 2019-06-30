const mongodb = require("mongodb");
const getDb = require("../database").getDb;

class Post {
  constructor(author, description, image, category) {
    this.author = author;
    this.description = description;
    this.image = image;
    this.category = category;
    this.date = Date.now();
    this.votes = 0;
    this.comments = [];
  }

  // save() {
  //   const db = getDb();
  //   return db
  //     .collection("posts")
  //     .insertOne(this)
  //     .then(result => {
  //       console.log(result);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("posts")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("posts").insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static updateVote(id) {
    const db = getDb();
    return db
      .collection("posts")
      .updateOne({ _id: new mongodb.ObjectID(id) }, { $inc: { "votes": 1 } })
      .then(result => {
        console.log(result);
      });
  }

  static updateComment(id, comment) {
    const db = getDb();
    return db
      .collection("posts")
      .updateOne({ _id: new mongodb.ObjectID(id) }, {
        $push: {
          comments: {
            $each: [{ user: comment.user, text: comment.text }]
          }
        }
      })
      .then(result => {
        console.log(result);
      });
  }

  static findById(postId) {
    const db = getDb();
    return db
      .collection("posts")
      .find({ _id: new mongodb.ObjectID(postId) })
      .next()
      .then(post => {
        console.log(post);
        return post;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("posts")
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Post;
