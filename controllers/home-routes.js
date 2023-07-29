const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// require authorize from utils to implement as middleware for routes (except homepage and login)
const authorize = require('../utils/authorize');

router.get('/', async (req, res) => {
  try {
    // get all post data
    const postData = await Post.findAll({include: [User, Comment]});
    // serialize post data
    const posts = await postData.map(post => post.get({ plain: true }));
    // render posts using home-page handlebars template
    res.render('home-page', {posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', authorize, async (req, res) => {
  try{
    const singlePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        }
      ]
    });
    const post = singlePost.get({ plain: true });
    res.render('post', {post});
  } catch(err){
    res.status(500).json(err);
  };
})

router.get('/login', (req, res) => {
  // implement conditional to check if session is loggedIn and if it is, then redirect to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', authorize, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [Post, Comment]
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', {user});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;