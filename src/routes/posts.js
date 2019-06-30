const path = require("path");

const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");

router.get("/", postsController.getPosts);

router.get("/posts", postsController.getPosts);

router.get("/posts/:postId", postsController.getPost);

router.get("/add-post", postsController.getAddPost);

router.post("/add-post", postsController.postAddPost);

router.patch("/add-vote", postsController.addVote);

router.patch("/add-comment", postsController.addComment);

module.exports = router;
