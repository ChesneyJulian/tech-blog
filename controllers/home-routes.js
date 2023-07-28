const router = require('express').Router();
const { User, Post, Comment } = require('../models');

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

router.get('/post/:id', async (req, res) => {
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
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('login');
});

module.exports = router;