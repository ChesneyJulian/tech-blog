const router = require('express').Router();
const { User } = require('../../models');

// create route for creating a user profile
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.username = userData.username;
      req.session.loggedIn = true;
      req.session.userId = userData.id;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create route for user login
router.post('/login', async (req, res) => {
  try {
    // find user data with matching username
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    // return error message if no user found
    if (!userData) {
      return res.status(400).json({message: 'Incorrect username or password'});
    };
    // validate password using custom comparePassword method in User model with req.body.password
    const validPassword = await userData.comparePassword(req.body.password);
    // return error if password is not validated
    if(!validPassword)  {
      return res.status(400).json({message: 'Incorrect username or password'});
    };
    req.session.save(() => {
      // save username from userData.username to req.session
      req.session.username = userData.username;
      req.session.userId = userData.id;
      // set session.loggedIn to true
      req.session.loggedIn = true;
      // return successful message
      res.json({ user: userData, message: 'Successfully logged in!'});
    })
  } catch (err) {
    res.status(500).json(err);
  };
})

router.post('/logout', (req, res) => {
  try {
     if (req.session.loggedIn) {
      req.session.destroy(() => {
      res.status(204).end();
    });
    } else {
      res.status(404).end();
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;