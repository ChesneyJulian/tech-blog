const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    // get all post data
    const postData = await Post.findAll({include: [User, Comment]});
    // serialize post data
    const posts = postData.map(post => post.get({ plain: true }));
    // render posts using home-page handlebars template
    res.render('home-page', {posts});
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;