const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// require authorize from utils to implement as middleware for routes (except homepage and login)
const authorize = require('../../utils/authorize');

router.post('/new-post', authorize, async (req, res) => {
  console.log('POSTING');
  try {
    console.log('REQ BODY: ', req.body);
    console.log('REQ SESSION', req.session);
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      creatorId: req.session.userId
    })
    console.log("POST ", newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/new-comment', authorize, async (req, res) => {  
  try {
    console.log('CREATING COMMENT')
    console.log('POST ID IN SERVER', req.body.postId);
    const newComment = await Comment.create({
      content: req.body.content,
      postId: req.body.postId,
      creatorId: req.session.userId,
    })
    console.log('NEW COMMENT ', newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/delete-post/:id', authorize, async (req, res) => {
  try{
    const postData = await Post.destroy()
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;