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
    res.render('home-page', { 
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', authorize, async (req, res) => {
  try{
    const singlePost = await Post.findByPk(req.params.id, {
      include: [User, Comment]
    });
    const post = singlePost.get({ plain: true });
    const commentData = Comment.findAll({
      where: {
        postId: post.id
      }, 
        include: [User]
    });
    const comments = (await commentData).map(comment => comment.get({ plain: true }));
    console.log(post);
    res.render('post', {
      post,
      comments,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      userId: req.session.userId
    });
  } catch(err){
    res.status(500).json(err);
  };
});

router.get('/dashboard', authorize, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.session.username
      },
      include: [{
        model: Post
      }]
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', {
      user,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // implement conditional to check if session is loggedIn and if it is, then redirect to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;