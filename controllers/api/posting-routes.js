const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// require authorize from utils to implement as middleware for routes (except homepage and login)
const authorize = require('../../utils/authorize');

router.post('/new-post', authorize, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.session.username
      }
    });
    const user = userData.get({ plain: true });
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      creatorId: user.id
    })
    console.log(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;